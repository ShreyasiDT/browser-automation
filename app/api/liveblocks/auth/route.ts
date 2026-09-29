import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

import { liveblocks } from "@/lib/liveblocks";

type UserInfo = { name: string; avatar: string };

// Clerk caps the userId filter at 100 IDs per request
const CLERK_FILTER_LIMIT = 100;

export async function POST(request: Request) {
  const { userId, orgId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);

  // resolveUsers sends { userIds }; the LiveblocksProvider authEndpoint sends { room }
  if (body && typeof body === "object" && "userIds" in body) {
    if (!orgId) {
      return new Response("Forbidden", { status: 403 });
    }

    const { userIds } = body;
    if (
      !Array.isArray(userIds) ||
      !userIds.every((id): id is string => typeof id === "string")
    ) {
      return new Response("userIds must be an array of strings", {
        status: 400,
      });
    }

    return Response.json(await resolveOrgUsers(orgId, userIds));
  }

  const user = await currentUser();

  // Rooms grant access via groupsAccesses keyed by the Clerk org ID
  const { status, body: identifyBody } = await liveblocks.identifyUser(
    {
      userId,
      groupIds: orgId ? [orgId] : [],
      organizationId: orgId,
    },
    {
      userInfo: {
        name: user?.fullName ?? user?.username ?? "Anonymous",
        avatar: user?.imageUrl,
      },
    },
  );

  return new Response(identifyBody, { status });
}

// Only members of the caller's org resolve, so user info can't leak across orgs
async function resolveOrgUsers(
  orgId: string,
  userIds: string[],
): Promise<(UserInfo | null)[]> {
  const client = await clerkClient();
  const uniqueIds = [...new Set(userIds)];
  const infoById = new Map<string, UserInfo>();

  for (let i = 0; i < uniqueIds.length; i += CLERK_FILTER_LIMIT) {
    const chunk = uniqueIds.slice(i, i + CLERK_FILTER_LIMIT);
    const { data } = await client.organizations.getOrganizationMembershipList({
      organizationId: orgId,
      userId: chunk,
      limit: chunk.length,
    });

    for (const { publicUserData } of data) {
      if (!publicUserData) continue;
      const { userId, firstName, lastName, imageUrl } = publicUserData;
      const fullName = [firstName, lastName].filter(Boolean).join(" ");
      infoById.set(userId, { name: fullName || "Anonymous", avatar: imageUrl });
    }
  }

  return userIds.map((id) => infoById.get(id) ?? null);
}

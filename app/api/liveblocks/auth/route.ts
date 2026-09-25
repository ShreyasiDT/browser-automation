import { auth, currentUser } from "@clerk/nextjs/server";

import { liveblocks } from "@/lib/liveblocks";

export async function POST() {
  const { userId, orgId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  // Rooms grant access via groupsAccesses keyed by the Clerk org ID
  const { status, body } = await liveblocks.identifyUser(
    {
      userId,
      groupIds: orgId ? [orgId] : [],
    },
    {
      userInfo: {
        name: user?.fullName ?? user?.username ?? "Anonymous",
        avatar: user?.imageUrl,
      },
    }
  );

  return new Response(body, { status });
}

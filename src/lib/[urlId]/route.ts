// import { authOptions } from "@/app/api/auth/[...nextauth]/options";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { urlId: string } }
// ) {
//   const session = await getServerSession(authOptions);

//   if (!session?.user) {
//     return NextResponse.json(
//       { error: "You are not authenticated" },
//       { status: 401 }
//     );
//   }

//   try {
//     const urlId = params.urlId;

//     const url = await prisma.url.findFirst({
//       where: {
//         id: urlId,
//         userId: session?.user.id,
//       },
//       include: {
//         clicks: {
//           orderBy: { createdAt: "desc" },
//           select: {
//             id: true,
//             createdAt: true,
//             browser: true,
//             device: true,
//           },
//         },
//         _count: { select: { clicks: true } },
//       },
//     });

//     if (!url) {
//       return NextResponse.json({ error: "URL not found" }, { status: 404 });
//     }

//     return NextResponse.json(url);
//   } catch (error) {
//     NextResponse.json({ error: "Internal Error 500!" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { urlId: string } }
// ) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session?.user) {
//       return NextResponse.json(
//         { error: "You are not authenticated" },
//         { status: 401 }
//       );
//     }

//     const urlId = params.urlId;

//     const url = await prisma.url.delete({
//       where: { id: urlId, userId: session.user.id },
//     });

//     console.log("the deleted url is ", url);

//     return NextResponse.json(
//       { message: "Url deleted successfully!" },
//       { status: 200 }
//     );
//   } catch (error) {
//     NextResponse.json({ error: "Internal Error 500!" }, { status: 500 });
//   }
// }

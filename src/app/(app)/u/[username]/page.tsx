import { getProfileFromUsername } from "@/actions/profiles";
import { redirect } from "next/navigation";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const username = (await params).username;
    const profile = await getProfileFromUsername(username);

    if (!profile) {
        redirect("/home");
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-4xl">{profile.username}</h1>
            </div>
        </div>
    );
};

export default UserPage;

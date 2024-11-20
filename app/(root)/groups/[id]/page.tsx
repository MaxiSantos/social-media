import { fetchGroupDetails } from "@/lib/actions/group.actions";
import { currentUser } from "@clerk/nextjs/server";

type Params = Promise<{ id: string }>
export default async function Page(props: {
  params: Params
}) {
    const user = await currentUser();
    const params = await props.params;
    if (!user) return null;
    const groupDetails = await fetchGroupDetails(params.id);
}
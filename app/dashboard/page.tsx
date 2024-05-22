import { auth } from "@/auth"
import logout from "@/actions/signOut"

export default async function dashboard() {


    const session = await auth()
    return (
        <>
        
           <div>Dashboard</div>
        
           <p>{JSON.stringify(session)}</p>


            <form action={logout}>
                <button>Button</button>
            </form>
        </>
    )
}
import { useSession } from 'next-auth/client'
import AccessDenied from '../components/access-denied'

function MyAccount() {
    const [ session, loading ] = useSession()

    // If no session exists, display access denied message
    if (!session) { return  <AccessDenied/> }

    return <div className="container-fluid">
    <div className="jumbotron">
        <div className="container">
            <h1 className="display-3">{session.user.name}</h1>
            <h2>{session.user.email}</h2>
        </div>
    </div>

    
  </div>
}
  
export default MyAccount
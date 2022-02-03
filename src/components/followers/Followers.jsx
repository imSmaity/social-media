
import { Link} from 'react-router-dom';
import { UserStatus } from '../components';



function Followers({loading,users,followers}) {

    return (
        <>
            {
                loading?
                users.map((user,index)=>{
                    for(let i=0;i<followers.length;i++){
                        if(followers[i]===user._id){
                            i=followers.length
                            return(
                                <div className='row mt-4' key={index}>
                                    <div className='col-2'>
                                        <Link to={`/${user._id}`}> <img src={user.avatar} alt='pp' id='havatar'/></Link>
                                    </div>
                                    <div className="col-6">
                                        <Link to={`/${user._id}`} className='sp'>{`${user.fname} ${user.lname}`}
                                            <div style={{marginTop:'-1vh',color:'gray',fontSize:'2.5vh'}}>@{user._id}</div>
                                        </Link>
                                        <div>{user.bio}</div>
                                    </div>
                                    <div className="col-4">
                                        <UserStatus user={user}/>
                                    </div>
                                </div>
                            )
                        }
                    }
                    return <div key={index}></div>
                }):
                <div>Loading...</div>
            }
        </>
    );
}

export default Followers;

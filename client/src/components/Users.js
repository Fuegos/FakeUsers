import InfiniteScroll from 'react-infinite-scroll-component'
import User from './User'


export default function Users(props) {

    const loader = <div className='d-flex justify-content-center'>
        <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
     

    return(
        <div>
            <InfiniteScroll
                dataLength={props.users.length}
                next={props.fetchMoreData}
                hasMore={true}
                loader={loader}
                scrollThreshold="100%"
            >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className='col-1'>#</th>
                            <th scope="col" className='col-1'>Id</th>
                            <th scope="col" className='col-3'>Full Name</th>
                            <th scope="col" className='col-5'>Address</th>
                            <th scope="col" className='col-2'>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.users.map((u, index) => <User key={u._id} user={u} numRow={index + 1} />)}
                    </tbody>
                </table>
                <div className="fixed-bottom d-flex justify-content-end">
                    <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={props.getCSV}
                    >
                        Export to CSV
                    </button>
                </div>
            </InfiniteScroll>
        </div>
    )
}
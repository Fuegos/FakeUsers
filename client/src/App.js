import { useState, useEffect, useRef } from 'react'
import ToolBar from './components/ToolBar'
import Users from './components/Users'
import axios from 'axios'
import fileDownload from 'js-file-download'


function App() {
    const [region, setRegion] = useState("en_US")
    const [regions, setRegions] = useState([])
    const [users, setUsers] = useState([])
    const [seed, setSeed] = useState(0)
    const [countError, setCountError] = useState(0)
    const [numPage, setNumPage] = useState(0)

    useEffect(() => {
        getUsers(20, region)
        getRegions()
    }, [])

    const isInitialMount = useRef(true)

    useEffect(() => {
        if(isInitialMount.current) {
            isInitialMount.current = false
        } else {
            getUsers(20, region, true)
        }
    }, [region, countError, seed])

    const fetchMoreData = () => {
        getUsers(10, region)
    }

    const getUsers = (count, region, isReset = false) => {
        axios.get(`/api/users`, {
            params: {
                count: count,
                region: region,
                numPage: numPage,
                seed: seed,
                countError: countError
            }
        }).then((res) => {
            if(isReset) {
                setUsers(() => res.data)
                setNumPage(() => 1)
            } else {
                setUsers(prevState => prevState.concat(res.data))
                setNumPage(prevState => prevState + 1)
            }
            
        }) 
    }

    const getCSV = () => {
        axios.get(`/api/users/csv`, {
            params: {
                region: region,
                numPage: numPage,
                seed: seed,
                countError: countError
            }
        }).then(res => {
            fileDownload(res.data, "fakeUsers.csv")
        })
    }

    const getRegions = () => {
        axios.get(`/api/regions`).then((res) => {
            setRegions(res.data)
        })
    }

    const changeRegion = event => {
        setNumPage(() => 0)
        setRegion(() => event.target.value)
    }

    const changeCountError = event => {
        setNumPage(() => 0)
        setCountError(() => event.target.value)
    }

    const changeSeed = event => {
        setNumPage(() => 0)
        setSeed(() => event.target.value)
    }

    const setRandomSeed = () => {
        setNumPage(() => 0)
        setSeed(() => Math.round(Math.random() * 1000000))
    }

    return (
        <div>
            <div className="container-fluid mb-4 mt-1 d-flex justify-content-center">
                <h1>Fake users</h1>
            </div>
            <ToolBar 
                region={region} 
                regions={regions}
                countError={countError}
                seed={seed}
                users={users}
                changeRegion={changeRegion}
                changeCountError={changeCountError}
                changeSeed={changeSeed}
                setRandomSeed={setRandomSeed}
            />
            <Users 
                region={region}
                users={users}
                getCSV={getCSV}
                fetchMoreData={fetchMoreData}
            />
        </div>
    );
}

export default App;

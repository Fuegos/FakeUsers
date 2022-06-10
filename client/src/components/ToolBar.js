export default function ToolBar(props) {
    
    const regionOptions = props.regions.map(r => <option value={r.code} key={r.code}>{r.name}</option>)

    return (
        <div className="container-fluid mb-5">
            <div className="row">
                <div className="col-5">
                    <div className="row border p-2 d-flex justify-content-center align-items-center">
                        <div className="col-4">
                            <p className="fw-bolder">Region</p>
                        </div>
                        <div className="col-8">
                            <select
                                id="region"
                                className="form-select form-select-sm" 
                                value={props.region}
                                onChange={props.changeRegion}
                            >
                                {regionOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-7">
                    <div className="row border p-2 d-flex justify-content-center align-items-center">
                        <div className="col-4">
                            <p className="fw-bolder">Seed</p>
                        </div>
                        <div className="col">
                            <input 
                                type="number"
                                min="0"
                                max="999999" 
                                className="form-control" 
                                id="seed" 
                                value={props.seed}
                                onChange={props.changeSeed}
                                required
                            />
                        </div>
                        <div className="col d-grid">
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={props.setRandomSeed}
                            >
                                Random
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="row border p-2 d-flex justify-content-center align-items-center">
                <div className="col-2">
                    <p className="fw-bolder">Error per record</p>
                </div>
                <div className="col-8">
                    <input 
                        type="range" 
                        className="form-range" 
                        min="0" 
                        max="10" 
                        step="0.25" 
                        id="errorRange" 
                        value={props.countError}
                        //onChange={props.changeCountError}
                        onChange={props.changeCountError}
                    />
                </div>
                <div className="col-2">
                    <input 
                        type="number"
                        min="0"
                        max="1000" 
                        className="form-control" 
                        id="errorInput" 
                        value={props.countError}
                        onChange={props.changeCountError}
                        required
                    />
                </div>
            </div>
        </div>
    )
}
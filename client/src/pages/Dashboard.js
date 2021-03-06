/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef} from "react";
import SearchForm from "../components/SearchForm";
import API from "../utils/API";
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { ProgressBar} from 'react-bootstrap';
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import { Col, Row, Container } from "../components/Grid";
import Moment from "moment";
import _ from "lodash";
// import { Query } from "mongoose";

const sendQuery = query => console.log(`Querying for ${query}`);

function Dashboard() {
 // Setting our component's initial state

 const [cases, setCases] = useState([]);
 const [deaths, setDeath] = useState([]);
 const [search, setSearch] = useState("");
 const [stats, setStats] = useState([]);
 const [deathStats, setDeathStats] = useState([]);
 const [recoveryStats, setRecoveryStats] = useState([]);
 
 
 
 const delayedQuery = useRef(_.debounce(q => sendQuery(q), 500)).current;
 

useEffect(() => { 
  const runEffect = async () => {
   var country = "usa";
   await getStats(country);
};
runEffect();  
},[]);

async function getStats(country) {
  //* For Donut chart input
  API.search(country).then(res => {
    setCases(res.data.response[0].cases);
    setDeath(res.data.response[0].deaths);
  })

  //* for 7 Day trend input   
  var statArray = [];
  var recoveredArray = [];
  var deathArray = [];

  for(var i=6; i>=0; i--) {
    var date = Moment(new Date()).subtract(i, "days").format("YYYY-MM-DD");
    const apiData = await API.searchStats(date, country);
    const result =  apiData.data.response[0].cases;
    const deathResult = apiData.data.response[0].deaths;      
    statArray.push(result.new);
    recoveredArray.push(result.recovered);
    deathArray.push(deathResult.total);
    console.log(statArray);
  }  
  setStats(statArray);  
  setDeathStats(deathArray);
  setRecoveryStats(recoveredArray);       

}

  //Handles updating search component state when the user types/selects the country input field
  function handleInputChange (event) {
    const value = event.target.value;
    setSearch(value)
    delayedQuery(value);
  }
  
    

 function handleFormSubmit(event) {
    console.log(event);
    event.preventDefault();
    console.log(search);
    if (search) {
      getStats(search);
      console.log("Searching by search");
    } else {
      getStats("usa");
      console.log("searching by usa by default");
    } 


  };

  // var minRecovered, maxRecovered;

  const areaData = {
    labels: ["Day1", "Day2", "Day3", "Day4", "Day5", "Day6", "Day7"],
    datasets: [{
        label: 'Death',
        data: deathStats,
        backgroundColor: '#transparent',
        borderColor: 'red',
        // borderWidth: 1,
        // fill: true,
        datasetKeyProvider: "key1"
      },
      {
        label: 'Recovered',
        data: recoveryStats,
        backgroundColor: 'transparent',
        borderColor: '#15b67d',
        // borderWidth: 1,
        // fill: true,
        datasetKeyProvider: "key2"
      }
    ]
  };

  const areaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        gridLines: {
          color: "tranparent"
        },
        ticks: {
          beginAtZero: true,
          min: 0, //min
          max: 250000, //max variable
          stepSize: 25000 // (max - min)/10
        }
      }],
      xAxes: [{
        gridLines: {
          color: "transparent"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 2
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    stepsize: 1
  };

  const usersDoughnutChartData = {
    datasets: [{
      data: [cases.active, cases.recovered, deaths.total],
      backgroundColor: [
        "#2196f3",
        "#19d895",
        "#dc3545"
      ],
      borderColor: [
        "#2196f3",
        "#19d895",
        "#dc3545"
      ],
    }],
    labels: [
      'Active',
      'Recovered',
      'Deaths'
    ]
};

const usersDoughnutChartOptions = {
  cutoutPercentage: 70,
  animationEasing: "easeOutBounce",
  animateRotate: true,
  animateScale: false,
  responsive: true,
  maintainAspectRatio: true,
  showScale: true,
  legend: {
    display: false
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  }
};

const amountDueBarData = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
  datasets: [{
    label: '',
    data: stats,
    backgroundColor: [
      '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
    ],
    borderColor: [
      '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
    ],
    borderWidth: 2,
    fill: true
  }]
};

const amountDueBarOptions = {
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },

  scales: {
    responsive: true,
    maintainAspectRatio: true,
    yAxes: [{
      display: false,
      gridLines: {
        color: 'rgba(0, 0, 0, 0.03)',
      }
    }],
    xAxes: [{
      display: false,
      barPercentage: 0.4,
      gridLines: {
        display: false,
      }
    }]
  },
  legend: {
    display: false
  }
};

  
  return (
    //page background color
    <div className= "page"  > 
    {/* style= {{backgroundColor: "#577F9F"}}  */}
      <Container fluid>
        <Row>
          <Col size="md-2 lg-2">
            <SubMenu />
          </Col>
          <Col size ="md-10 lg-10">
            <Navbar />
  
            <div className= "container col-lg-10" style= {{padding: "10px 10px"}}> 

              <SearchForm
                search= {search}
                handleFormSubmit={handleFormSubmit}
                handleInputChange={handleInputChange}
              />

              <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                  <div className="card card-statistics">
                    <div className="card-body" >
                      <div className="clearfix">
                        <div className="float-left">
                          <i className="mdi mdi-cube text-danger icon-lg"></i>
                        </div>
                        <div className="float-right">
                          <p className="mb-0 text-right text-dark">Total Cases</p>
                          <div className="fluid-container">
                            <h3 className="font-weight-medium text-right mb-0 text-dark"> {cases.total} </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mt-3 mb-0"><i style={{color: "#d4d4d4"}} className="fas fa-users fa-5x"  aria-hidden="true"></i> 12% growth </p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                  <div className="card card-statistics">
                    <div className="card-body">
                      <div className="clearfix">
                        <div className="float-left">
                          <i className="mdi mdi-receipt text-warning icon-lg"></i>
                        </div>
                        <div className="float-right">
                          <p className="mb-0 text-right text-dark">New Cases</p>
                          <div className="fluid-container">
                            <h3 className="font-weight-medium text-right mb-0 text-dark"> {cases.new} </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mt-3 mb-0"> <i style={{color: "#d4d4d4"}} className="fas fa-chart-line fa-5x" aria-hidden="true"></i>12% growth</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                  <div className="card card-statistics">
                    <div className="card-body">
                      <div className="clearfix">
                        <div className="float-left">
                          <i className="mdi mdi-poll-box text-success icon-lg"></i>
                        </div>
                        <div className="float-right">
                          <p className="mb-0 text-right text-dark">Recovered</p>
                          <div className="fluid-container">
                            <h3 className="font-weight-medium text-right mb-0 text-dark"> {cases.recovered} </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mt-3 mb-0">
                        <i style={{color: "#d4d4d4"}} className="fas fa-file-medical-alt fa-5x" aria-hidden="true"></i> {parseInt(100*cases.recovered/cases.total)}% Recovered</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
                  <div className="card card-statistics">
                    <div className="card-body">
                      <div className="clearfix">
                        <div className="float-left">
                          <i className="mdi mdi-account-box-multiple text-info icon-lg"></i>
                        </div>
                        <div className="float-right">
                          <p className="mb-0 text-right text-dark">Active</p>
                          <div className="fluid-container">
                            <h3 className="font-weight-medium text-right mb-0 text-dark"> {cases.active} </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted mt-3 mb-0">
                        <i style={{color: "#d4d4d4"}} className="fas fa-viruses fa-5x" size = "36px" aria-hidden="true"></i> </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
              <div className="col-sm-6 col-md-6 col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5 d-flex align-items-center">
                        <Doughnut data={usersDoughnutChartData} options={usersDoughnutChartOptions} width= {180} />
                      </div>
                      <div className="col-md-7">
                        <h4 className="card-title font-weight-medium mb-0 d-none d-md-block"> Statistics </h4>
                        <div className="wrapper mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex align-items-center">
                              <p className="mb-0 font-weight-medium"> {cases.recovered} </p>
                              <small className="text-muted ml-2">Recovered</small>
                            </div>
                            <p className="mb-0 font-weight-medium">  {parseInt(100*cases.recovered/cases.total)}% </p>
                          </div>
                          <ProgressBar variant="success" now={100*cases.recovered/cases.total}/>
                        </div>
                        <div className="wrapper mt-4">
                          <div className="d-flex justify-content-between mb-2">
                            <div className="d-flex align-items-center">
                              <p className="mb-0 font-weight-medium">{deaths.total}</p>
                              <small className="text-muted ml-2">Deaths</small>
                            </div>
                            <p className="mb-0 font-weight-medium">{parseInt(100*deaths.total/cases.total)}%</p>
                          </div>
                          <ProgressBar variant="danger" now={100*deaths.total/cases.total}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-7">
                        <div></div>
                        
                        <h3 className="font-weight-medium mb-0 text-dark"> New Cases</h3>
                        <p className="card-title font-weight-medium mb-3"> Weekly Trend </p>
                        {/* <p className="text-muted">Place Holder</p>
                        <p className="mb-0">Place Holder</p> */}
                      </div>
                      <div className="col-md-5 d-flex align-items-end mt-4 mt-md-0">
                      {stats && 
                        <Bar data={amountDueBarData} options={amountDueBarOptions} />    }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>

              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="card-title mb-0"> </h2>
                        <div className="wrapper d-flex">
                          <div className="d-flex align-items-center mr-3" >
                            <span className="dot-indicator bg-success"></span>
                            <p className="mb-0 ml-2" style= {{color: 'red'}}>Death</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <span className="dot-indicator bg-primary"></span>
                            <p className="mb-0 ml-2" style= {{color: "#15b67d"}}>Recovered</p>
                          </div>
                        </div>
                      </div>
                      <div className="chart-container">
                        <Line data={areaData} options={areaOptions} height={80} />
                      </div>
                    </div>
                  </div>
                </div>
              </div> 

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
  
}


export default Dashboard;
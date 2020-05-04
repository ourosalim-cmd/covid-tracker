import React, { useState, useEffect } from "react";
import SearchForm from "../components/SearchForm";
import API from "../utils/API";
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { ProgressBar} from 'react-bootstrap';
import Navbar from "../components/Navbar";
import SubMenu from "../components/SubMenu";
import { Col, Row, Container } from "../components/Grid";



function Dashboard() {
 // Setting our component's initial state

 const [cases, setCases] = useState([]);
 const [deaths, setDeath] = useState([]);
 const [search, setSearch] = useState([]);


 useEffect(() => { 
   API.search("USA").then(res => {
     setCases(res.data.response[0].cases);
     setDeath(res.data.response[0].deaths);
    
     
   })
   }, []);

  function handleInputChange (event) {
    const value = event.target.value;
    setSearch(value);

  };

  function handleFormSubmit(event) {
    event.preventDefault();
    API.search(search).then(res => {
      setCases(res.data.response[0].cases);
      setDeath(res.data.response[0].deaths);
    
    })
  };

  const areaData = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [{
        label: 'Product-1',
        data: [3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
        backgroundColor: '#577F9F',
        borderColor: '#0c83e2',
        borderWidth: 1,
        fill: true,
        datasetKeyProvider: "key1"
      },
      {
        label: 'Product-2',
        data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
        backgroundColor: '#19d895',
        borderColor: '#15b67d',
        borderWidth: 1,
        fill: true,
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
          color: "#F2F6F9"
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 20,
          stepSize: 5,
        }
      }],
      xAxes: [{
        gridLines: {
          color: "#F2F6F9"
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
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10"],
  datasets: [{
    label: 'Profit',
    data: [39, 19, 25, 16, 31, 39, 12, 18, 33, 24],
    backgroundColor: [
      '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
    ],
    borderColor: [
      '#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3','#2196f3',
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
    <div className= "page" > 
    {/* style= {{backgroundColor: "#577F9F"}}  */}
      <Container fluid>
          <Row>
            <Col size="md-2">
              <SubMenu />
            </Col>
            <Col size ="md-10">
              <Navbar />
            
    {/* changed background color to light blue */}
      <div className= "container" style= {{padding: "20px 20px"}}> 

        <SearchForm
          search= {search}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />

        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
            <div className="card card-statistics">
              <div className="card-body">
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
                <p className="text-muted mt-3 mb-0">
                  <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i> 12% growth </p>
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
                <p className="text-muted mt-3 mb-0"> Place Holder </p>
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
                  <i className="mdi mdi-calendar mr-1" aria-hidden="true"></i>  </p>
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
                  <i className="mdi mdi-reload mr-1" aria-hidden="true"></i> Place Holder </p>
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
                  <h4 className="card-title font-weight-medium mb-3">Place Holder</h4>
                  <h1 className="font-weight-medium mb-0 text-dark">5998</h1>
                  <p className="text-muted">Place Holder</p>
                  <p className="mb-0">Place Holder</p>
                </div>
                <div className="col-md-5 d-flex align-items-end mt-4 mt-md-0">
                  <Bar data={amountDueBarData} options={amountDueBarOptions} />    
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
                  <h2 className="card-title mb-0">Analysis</h2>
                  <div className="wrapper d-flex">
                    <div className="d-flex align-items-center mr-3">
                      <span className="dot-indicator bg-success"></span>
                      <p className="mb-0 ml-2 text-muted">Place Holder</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="dot-indicator bg-primary"></span>
                      <p className="mb-0 ml-2 text-muted">PlaceHolder</p>
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
    </div>

    </Col>
    </Row>
    </Container>
    </div>
    
  );
  
}


export default Dashboard;
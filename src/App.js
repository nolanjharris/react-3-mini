import React, { Component } from 'react';
import logo from './mainStreetAuto.svg';
import axios from 'axios';
import './App.css';

// Toast notification dependencies
import { ToastContainer, toast } from 'react-toastify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vehiclesToDisplay: [],
      buyersToDisplay: []
    };

    this.getVehicles = this.getVehicles.bind(this);
    this.getPotentialBuyers = this.getPotentialBuyers.bind(this);
    this.sellCar = this.sellCar.bind(this);
    this.addCar = this.addCar.bind(this);
    this.filterByColor = this.filterByColor.bind(this);
    this.filterByMake = this.filterByMake.bind(this);
    this.addBuyer = this.addBuyer.bind(this);
    this.nameSearch = this.nameSearch.bind(this);
    this.resetData = this.resetData.bind(this);
    this.byYear = this.byYear.bind(this);
    this.deleteBuyer = this.deleteBuyer.bind(this);
  }

  getVehicles() {
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get('https://joes-autos.herokuapp.com/api/vehicles').then(response => {
      toast.success('Successfully got all the vehicles');
      this.setState({ vehiclesToDisplay: response.data });
    }).catch(() => toast.error('Woops, something went wrong displaying the vehicles'));
  }

  getPotentialBuyers() {
    // axios (GET)
    // setState with response -> buyersToDisplay
    axios.get('https://joes-autos.herokuapp.com/api/buyers').then(response => {
      this.setState({ buyersToDisplay: response.data });
      toast.success('Here are the buyers you wanted to see.');
    }).catch(() => toast.error('Whoops, we are unable to show you the buyers right now.'))
  }

  sellCar(id) {
    // axios (DELETE)
    // setState with response -> vehiclesToDisplay
    axios.delete(`https://joes-autos.herokuapp.com/api/vehicles/${id}`).then(response => {
      this.setState({ vehiclesToDisplay: response.data.vehicles });
      toast.success('Congratulations! You just bought a car!');
    }).catch(() => toast.error('Whoops, we cant sell you that car at this time.'))
  }

  filterByMake() {
    let make = this.selectedMake.value;
    console.log(make)
    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?make=${make}`).then(response => {
      this.setState({ vehiclesToDisplay: response.data });
      toast.success('Here are the cars you requested filtered by make.');
    }).catch(() => toast.error('Whoops, something went wrong filtering by make.'));
  }

  filterByColor() {
    let color = this.selectedColor.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?color=${color}`).then(response => {
      this.setState({ vehiclesToDisplay: response.data });
      toast.success('Here are the cars you requested filtered by color.');
    }).catch(() => toast.error('Whoops, something went wrong filtering by color.'));
  }

  updatePrice(priceChange, id) {
    // axios (PUT)
    // setState with response -> vehiclesToDisplay
    axios.put(`https://joes-autos.herokuapp.com/api/vehicles/${id}/${priceChange}`).then(response => {
      this.setState({ vehiclesToDisplay: response.data.vehicles });
      toast.success(`We took the price ${priceChange} by $1000 for you`);
    }).catch(() => toast.error('Woops, something went wrong changing the price'));
  }

  addCar() {
    let newCar = {
      make: this.make.value,
      model: this.model.value,
      color: this.color.value,
      year: this.year.value,
      price: this.price.value
    };

    // axios (POST)
    // setState with response -> vehiclesToDisplay
    axios.post('https://joes-autos.herokuapp.com/api/vehicles', newCar).then(response => {
      this.setState({ vehiclesToDisplay: response.data.vehicles });
      toast.success('You have successfully added a vehicle!');
    }).catch(() => toast.error('There was a problem adding that vehicles.'));
  }

  addBuyer() {
    let newBuyer = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value
    };

    //axios (POST)
    // setState with response -> buyersToDisplay
    axios.post('https://joes-autos.herokuapp.com/api/buyers', newBuyer).then(response => {
      this.setState({ buyersToDisplay: response.data.buyers });
      toast.success('You have successfully added a buyer!');
    }).catch(() => toast.error('Whoops, something went wrong adding a buyer.'));

  }

  deleteBuyer(id) {
    // axios (DELETE)
    //setState with response -> buyersToDisplay
    axios.delete(`https://joes-autos.herokuapp.com/api/buyers/${id}`).then(response => {
      this.setState({ buyersToDisplay: response.data.buyers });
      toast.success('You have deleted a buyer');
    }).catch(() => toast.error('Whoops, something went wrong deleting that buyer.'));
  }

  nameSearch() {
    let searchLetters = this.searchLetters.value;
    console.log(searchLetters);
    // axios (GET)
    // setState with response -> buyersToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/buyers?name=${searchLetters}`).then(response => {
      console.log(response);
      this.setState({ buyersToDisplay: response.data });
      toast.success('Searching by name...');
    }).catch(() => toast.error('Whoops, we cant find that buyer.'));
  }

  byYear() {
    let year = this.searchYear.value;

    // axios (GET)
    // setState with response -> vehiclesToDisplay
    axios.get(`https://joes-autos.herokuapp.com/api/vehicles?year=${year}`).then(response => {
      console.log(year);
      this.setState({ vehiclesToDisplay: response.data });
      toast.success('Here are the cars you requested filtered by year.');
    }).catch(() => toast.error('Whoops, something went wrong filtering by year.'));
  }

  // Do not edit the code below
  resetData(dataToReset) {
    axios
      .get('https://joes-autos.herokuapp.com/api/' + dataToReset + '/reset')
      .then(res => {
        if (dataToReset === 'vehicles') {
          this.setState({ vehiclesToDisplay: res.data.vehicles });
        } else {
          this.setState({ buyersToDisplay: res.data.buyers });
        }
      });
  }
  // Do not edit the code above

  render() {
    const vehicles = this.state.vehiclesToDisplay.map(v => {
      return (
        <div key={v.id}>
          <p>Make: {v.make}</p>
          <p>Model: {v.model}</p>
          <p>Year: {v.year}</p>
          <p>Color: {v.color}</p>
          <p>Price: {v.price}</p>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice('up', v.id)}
          >
            Increase Price
          </button>

          <button
            className="btn btn-sp"
            onClick={() => this.updatePrice('down', v.id)}
          >
            Decrease Price
          </button>

          <button className="btn btn-sp" onClick={() => this.sellCar(v.id)}>
            SOLD!
          </button>

          <hr className="hr" />
        </div>
      );
    });

    const buyers = this.state.buyersToDisplay.map(person => {
      return (
        <div key={person.id}>
          <p>Name: {person.name}</p>
          <p>Phone: {person.phone}</p>
          <p>Address: {person.address}</p>

          <button
            className="btn"
            onClick={() => {
              this.deleteBuyer(person.id);
            }}
          >
            No longer interested
          </button>

          <hr className="hr" />
        </div>
      );
    });

    return (
      <div>
        <ToastContainer />

        <header className="header">
          <img src={logo} alt="" />

          <button
            className="header-btn1 btn"
            onClick={() => this.resetData('vehicles')}
          >
            Reset Vehicles
          </button>

          <button
            className="header-btn2 btn"
            onClick={() => this.resetData('buyers')}
          >
            Reset Buyers
          </button>
        </header>

        <div className="btn-container">
          <button className="btn-sp btn" onClick={this.getVehicles}>
            Get All Vehicles
          </button>

          <select
            onChange={this.filterByMake}
            ref={selectedMake => {
              this.selectedMake = selectedMake;
            }}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by make
            </option>
            <option value="Suzuki">Suzuki</option>
            <option value="GMC">GMC</option>
            <option value="Ford">Ford</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Cadillac">Cadillac</option>
            <option value="Dodge">Dodge</option>
            <option value="Chrysler">Chrysler</option>
          </select>

          <select
            ref={selectedColor => {
              this.selectedColor = selectedColor;
            }}
            onChange={this.filterByColor}
            className="btn-sp"
            value=""
          >
            <option value="" disabled>
              Filter by color
            </option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="Purple">Purple</option>
            <option value="indigo">Indigo</option>
            <option value="violet">Violet</option>
            <option value="teal">Teal</option>
            <option value="white">White</option>
          </select>

          <input
            onChange={this.nameSearch}
            placeholder="Search by name"
            type="text"
            ref={searchLetters => {
              this.searchLetters = searchLetters;
            }}
          />

          <input
            ref={searchYear => {
              this.searchYear = searchYear;
            }}
            className="btn-sp"
            type="number"
            placeholder="Year"
          />

          <button onClick={this.byYear} className="btn-inp">
            Go
          </button>

          <button className="btn-sp btn" onClick={this.getPotentialBuyers}>
            Get Potential Buyers
          </button>
        </div>

        <br />

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="make"
            ref={make => {
              this.make = make;
            }}
          />
          <input
            className="btn-sp"
            placeholder="model"
            ref={model => {
              this.model = model;
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="year"
            ref={year => {
              this.year = year;
            }}
          />
          <input
            className="btn-sp"
            placeholder="color"
            ref={color => {
              this.color = color;
            }}
          />
          <input
            type="number"
            className="btn-sp"
            placeholder="price"
            ref={price => {
              this.price = price;
            }}
          />

          <button className="btn-sp btn" onClick={this.addCar}>
            Add vehicle
          </button>
        </p>

        <p className="form-wrap">
          <input
            className="btn-sp"
            placeholder="name"
            ref={name => {
              this.name = name;
            }}
          />
          <input
            className="btn-sp"
            placeholder="phone"
            ref={phone => {
              this.phone = phone;
            }}
          />
          <input
            className="btn-sp"
            placeholder="address"
            ref={address => {
              this.address = address;
            }}
          />

          <button onClick={this.addBuyer} className="btn-sp btn">
            Add buyer
          </button>
        </p>

        <main className="main-wrapper">
          <section className="info-box">
            <h3>Inventory</h3>

            {vehicles}
          </section>

          <section className="info-box">
            <h3>Potential Buyers</h3>

            {buyers}
          </section>
        </main>
      </div>
    );
  }
}

export default App;

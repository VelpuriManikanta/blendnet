import React, { useState, useEffect } from 'react';
import ApiService from './ApiService'; // Update the path based on the actual location of ApiService.js
import { Table, TableBody, TableCell,TextField, TableContainer, TableHead, TableRow, Paper, Button, Tabs, Tab } from '@material-ui/core';

const Dashboard = () => {
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [recent, setRecent] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchTopGainersAndLosers = async () => {
      try {
        const { top_gainers, top_losers } = await ApiService.getTopGainersAndLosers();
        if (top_gainers && Array.isArray(top_gainers) && top_losers && Array.isArray(top_losers)) {
          setGainers(top_gainers);
          setLosers(top_losers);
        } else {
          console.error('No gainers or losers data returned from API');
        }
      } catch (error) {
        console.error('Error fetching top gainers and losers:', error);
      }
    };

    fetchTopGainersAndLosers();
  }, []);

  const addToWishlist = (stock) => {
    setWishlist([...wishlist, stock]);
  };

  const removeFromWishlist = (index) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist.splice(index, 1);
    setWishlist(updatedWishlist);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const { bestMatches } = await ApiService.searchSymbol(searchKeyword);
      setSearchResults(bestMatches);
    } catch (error) {
      console.error('Error searching symbols:', error);
    }
  };


  const addToRecent = (symbol) => {
    setRecent([...recent, symbol]);
  };

  return (
    <div>
      <h1>Stock Dashboard</h1>
      <div>
        <TextField
          label="Search Symbol"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="Top Gainers" />
        <Tab label="Top Losers" />
        <Tab label="Wishlist" />
        <Tab label="Recent" />
      </Tabs>
      {activeTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Change</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gainers.map((gainer, index) => (
                <TableRow key={index}>
                  <TableCell>{gainer.ticker}</TableCell>
                  <TableCell>{gainer.price}</TableCell>
                  <TableCell>{gainer.change_percentage}</TableCell>
                  <TableCell>{gainer.volume}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => addToWishlist(gainer)}>
                      Add to Wishlist
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {activeTab === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Change</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {losers.map((loser, index) => (
                <TableRow key={index}>
                  <TableCell>{loser.ticker}</TableCell>
                  <TableCell>{loser.price}</TableCell>
                  <TableCell>{loser.change_percentage}</TableCell>
                  <TableCell>{loser.volume}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => addToWishlist(loser)}>
                      Add to Wishlist
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {activeTab === 2 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ticker</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Change</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishlist.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.ticker}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.change_percentage}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => removeFromWishlist(index)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {activeTab === 3 && (
        <div>
          <h2>Recent Searches</h2>
          <ul>
            {recent.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                {result['1. symbol']} - {result['2. name']}
                <Button variant="contained" color="primary" onClick={() => addToRecent(result['1. symbol'])}>
                  Add to Recent
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

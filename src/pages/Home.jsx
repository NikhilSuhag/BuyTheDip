import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Coin from "../components/Coin";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import Info from "./Info";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <HomeContainer>
        <div className="coin-search">
          <img src={logo} alt="logo"></img>
          <form>
            <input
              className="coin-input"
              type="text"
              onChange={handleChange}
              placeholder="Search"
            />
          </form>
        </div>
        <div className="coin-list">
          {filteredCoins.map((coin) => {
            return (
              <Link to={`/${coin.id}`} element={<Info />} key={coin.id}>
                <Coin
                  key={coin.id}
                  name={coin.name}
                  price={coin.current_price}
                  symbol={coin.symbol}
                  marketcap={coin.total_volume}
                  image={coin.image}
                  priceChange={coin.price_change_percentage_24h}
                />
              </Link>
            );
          })}
        </div>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #fff;
  min-height: 100vh;
  .coin-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 85%;
    .coin-input {
      width: 20rem;
      border-radius: 0.25rem;
      border: none;
      padding: 1rem;
      background-image: linear-gradient(
        -225deg,
        #d0db36 0%,
        #2cd464 30%,
        #d8325c 80%
      );
      color: #1a1515;
    }
    .coin-input::placeholder {
      color: #141010;
      font-weight: bold;
    }
    img {
      height: 8rem;
    }
  }
  .coin-list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    a {
      text-decoration: none;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media screen and (max-width: 820px) {
    .coin-search {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

export default Home;

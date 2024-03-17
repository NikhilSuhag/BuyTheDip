import React from "react";
import styled from "styled-components";

const Coin = ({ name, price, symbol, marketcap, image, priceChange }) => {
  return (
    <>
      <CoinContainer>
        <div className="coin-name">
          <img src={image} alt="crypto" />
          <h3>{name}</h3>
        </div>

        <p className="coin symbol">{symbol}</p>
        <p className="coin price">${price}</p>

        {priceChange < 0 ? (
          <p className="coin price-change red">{priceChange.toFixed(2)}%</p>
        ) : (
          <p className="coin price-change green">{priceChange.toFixed(2)}%</p>
        )}

        <p className="coin mktcap">Mkt Cap: ${marketcap.toLocaleString()}</p>
      </CoinContainer>
    </>
  );
};

const CoinContainer = styled.div`
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0rem;
  margin-top: 1rem;
  border-bottom: 1px solid #d7d7d7;
  transition: 0.5s ease-in-out;
  &:hover,
  &:focus {
    width: 87%;
    cursor: pointer;
    transform: translateY(-0.25em);
    border-bottom: 2px solid #fff;
    background-color: #1d1f1e;
  }
  img {
    height: 2rem;
  }
  .coin-name {
    min-width: 20%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .coin {
    min-width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .symbol {
    text-transform: uppercase;
  }
  .red {
    color: #f00606;
  }
  .green {
    color: #11d811;
  }
  .price-change {
    text-align: center;
  }

  @media screen and (max-width: 820px) {
    .coin-name {
      flex-direction: column;
    }
    .symbol,
    .mktcap {
      display: none;
    }
  }
`;

export default Coin;

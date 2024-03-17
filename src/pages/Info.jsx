import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { Backdrop, CircularProgress } from "@mui/material";

const Info = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${params.coinId}`)
      .then((res) => {
        setCoin(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <InfoContainer>
        {coin.name ? (
          <>
            <div className="content">
              <h1 className="coin-header">{coin.name}</h1>
            </div>
            <div className="content">
              <div className="rank">
                <span className="rank-btn">Rank # {coin.market_cap_rank}</span>
              </div>
              <div className="info">
                <div className="coin-heading">
                  {coin.image ? (
                    <img className="hide" src={coin.image.small} alt="" />
                  ) : null}
                  <p className="hide">{coin.name}</p>
                </div>
                {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
                <div className="coin-price">
                  {coin.market_data?.current_price ? (
                    <h2>
                      ${coin.market_data.current_price.usd.toLocaleString()}
                    </h2>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="content">
              <table>
                <thead>
                  <tr>
                    <th>1h</th>
                    <th>24h</th>
                    <th>7d</th>
                    <th className="hide">14d</th>
                    <th className="hide">30d</th>
                    <th className="hide">1yr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {coin.market_data
                        ?.price_change_percentage_1h_in_currency ? (
                        <p>
                          {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {coin.market_data
                        ?.price_change_percentage_24h_in_currency ? (
                        <p>
                          {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : null}
                    </td>
                    <td className="hide">
                      {coin.market_data
                        ?.price_change_percentage_24h_in_currency ? (
                        <p>
                          {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : null}
                    </td>
                    <td className="hide">
                      {coin.market_data
                        ?.price_change_percentage_24h_in_currency ? (
                        <p>
                          {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : null}
                    </td>
                    <td className="hide">
                      {coin.market_data
                        ?.price_change_percentage_24h_in_currency ? (
                        <p>
                          {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : null}
                    </td>
                    <td>
                      {coin.market_data
                        ?.price_change_percentage_24h_in_currency ? (
                        <p>
                          {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="content">
              <div className="stats">
                <div className="col">
                  <div className="row">
                    <h4>24 Hour Low</h4>
                    {coin.market_data?.low_24h ? (
                      <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
                    ) : null}
                  </div>
                  <div className="row">
                    <h4>24 Hour High</h4>
                    {coin.market_data?.high_24h ? (
                      <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
                    ) : null}{" "}
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <h4>Market Cap</h4>
                    {coin.market_data?.market_cap ? (
                      <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                    ) : null}
                  </div>
                  <div className="row">
                    <h4>Cir. Supply</h4>
                    {coin.market_data ? (
                      <p>{coin.market_data.circulating_supply}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="about">
                <h3>About</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      coin.description ? coin.description.en : ""
                    ),
                  }}
                ></p>
              </div>
            </div>
          </>
        ) : (
          <>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={true}
            />{" "}
            <CircularProgress color="inherit" />
          </>
        )}
      </InfoContainer>
    </>
  );
};

const InfoContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  position: absolute;
  .content {
    width: 75%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 6px whitesmoke;
    border: 2px solid white;
    border-radius: 0.5rem;
    .coin-header {
      text-align: center;
      text-transform: uppercase;
    }
    .rank {
      margin: 0.5 0;
      .rank-btn {
        box-shadow: 0px 0px 8px #6900ff;
        background-color: #6900ff;
        border-radius: 8px;
        padding: 0.2rem;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      .coin-heading {
        display: flex;
        justify-content: start;
        align-items: center;
      }
    }

    table {
      margin: 0.5rem 0;
    }

    td,
    th {
      padding: 8px;
      text-align: center;
    }

    th {
      background-color: #333;
    }

    .stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .col {
        width: 45%;
      }
      .row {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #808080;
        margin: 0.6rem 0;
        padding-bottom: 0.5rem;
        p:first-child {
          color: #d3d3d3;
        }
      }
    }

    .about {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      p {
        text-align: justify;
      }
    }

    @media screen and (max-width: 820px) {
      width: 90%;

      .stats {
        flex-direction: column;
        .col {
          width: 100%;
        }
      }

      .hide {
        display: none;
      }
    }
  }
`;

export default Info;

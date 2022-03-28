import React from "react";
import "./charts.css";
import axios from "axios";

import { Pdata, Radardata, RadarData2 } from "./chartData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  RadarChart,
  PolarAngleAxis,
  Area,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import DefaultLayout from "../DefaultLayout";
import { Form, Row, Col, Input, Select } from "antd";

const BarChart = () => {
  //fetch data from db

  // const datas = axios.get()

  return (
    <>
      <DefaultLayout>
        <Row>
          <Col lg={24}>
            <div className="chart">
              <h1 className="charHeading">Active Users & Posts</h1>
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                  data={Pdata}
                  width={500}
                  height={300}
                  margin={{ right: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
                  <Legend />

                  <XAxis
                    dataKey="Month"
                    interval={"preserveStartEnd"}
                    tickFormatter={(value) => value + " (Active Users)"}
                  />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="red"
                    activeDot={{ r: 8 }}
                  />
                  <Line dataKey="posts" stroke="green" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Col>
          <Col lg={24}>
            <hr className="chartHr" />
            <h1 className="charHeading">Numbers of Hours spend Online</h1>

            <div style={{ width: "100%", height: 400 }}>
              <ResponsiveContainer>
                <AreaChart
                  data={Radardata}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d7"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </DefaultLayout>
    </>
  );
};
export default BarChart;

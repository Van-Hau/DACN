import { Chip, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Reason from "./Reason";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import BusinessIcon from "@mui/icons-material/Business";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useState } from "react";
function ListReason() {
  const [list, setList] = useState([
    {
      icon: <Diversity3Icon />,
      topColor: "#ff2ae0",
      bottomColor: "#645bf6",
      title: "Team",
      content:
        "Bộ giải pháp quản lý công việc, quy trình và nâng cao năng suất",
    },
    {
      icon: <Diversity2Icon />,
      topColor: "#ffec61",
      bottomColor: "#f321d7",
      title: "HRM",
      content:
        "Bộ giải pháp quản trị nhân sự và phát triển con người toàn diện",
    },
    {
      icon: <BusinessIcon/> ,
      topColor: "#24ff72",
      bottomColor: "#9a4eff",
      title: "Business",
      content:
        "Bộ giải pháp quản lý bán hàng, quy trình bán hàng và nâng cao năng suất",
    },
    {
      icon: <WarehouseIcon/> ,
      topColor: "#0575e6",
      bottomColor: "#00f260",
      title: "Inventory",
      content: "Bộ giải pháp quản lý kho bãi, nâng cao chất lượng.",
    },
    {
      icon: <AttachMoneyIcon/> ,
      topColor: "#3C3B3F",
      bottomColor: "#605c3c",
      title: "Finance",
      content: "Bộ giải pháp quản trị tài chính doanh nghiệp.",
    },
  ]);
  return (
    <Stack alignItems="center" p="50px 20px"  gap={2}>
      <Typography
        variant="h2"
        sx={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "400",
          color: "#fff",
          m:'0 20px',
          width:'100%'
        }}
      >
        Hệ điều hành doanh nghiệp 4.0
        <Divider sx={{"&::before,&::after":{
          borderTop: 'thin solid rgba(255, 255, 255, 0.5)'
        }}}>
            <Chip label='MORE' color="primary"/>
        </Divider>
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontSize: "20px",
          textAlign: "center",
          fontWeight: "200",
          color: "#fff",
        }}
      >
        Tích hợp tất cả các ứng dụng doanh nghiệp của bạn đang cần trên cùng một
        nền tảng duy nhất.
      </Typography>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {list.map((item, i) => {
          return (
            <Reason
              key={i}
              Icon={item.icon}
              topColor={item.topColor}
              bottomColor={item.bottomColor}
              title={item.title}
              content={item.content}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

export default ListReason;

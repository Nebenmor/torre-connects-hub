import React from "react";
import { Users, Briefcase, MapPin, Star } from "lucide-react";
import StatsCard from "../common/StatsCard";
import { STATS_DATA } from "../../utils/constants";

const StatsSection = () => {
  const statsData = [
    {
      icon: Users,
      title: "Active Professionals",
      value: "2.5M+",
      color: "blue",
    },
    {
      icon: Briefcase,
      title: "Companies Hiring",
      value: "50K+",
      color: "green",
    },
    {
      icon: MapPin,
      title: "Countries",
      value: "190+",
      color: "purple",
    },
    {
      icon: Star,
      title: "Success Rate",
      value: "94%",
      color: "yellow",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsSection;

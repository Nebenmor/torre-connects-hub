import React from "react";
import PersonCard from "./PersonCard";

const PersonList = ({ people, onViewProfile, className = "" }) => {
  if (!people || people.length === 0) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          onViewProfile={onViewProfile}
        />
      ))}
    </div>
  );
};

export default PersonList;

import Box from "@material-ui/core/Box";
import React from "react";

import { getContactInfo, getSolverInfo, getSolverSolution } from "../../config";
// ...
import BoxInfo from "../BoxInfo";
import ContactCard from "../ContactCard/ContactCard";
import Snippet from "../Snippet";
import SnippetChallenges from "../SnippetChallenges";
import SnippetList from "../SnippetList";

const LeftSideContent = ({ solver, program, application }) => {
  const solverType = solver.type;
  // ...
  const solverInfo = getSolverInfo({ data: application });
  const contactInfo = getContactInfo({ data: application });
  // ...
  const solverSolution = getSolverSolution({
    data: application?.solution ?? {},
    program,
    solverType,
  });
  // ...
  const solverFounders = application?.founders ?? [];
  const solverMembers = application?.members ?? [];
  // ...
  return (
    <Box className="ApplicationEvaluation__LeftSide__content">
      <Box className="ApplicationEvaluation__LeftSide__content__inner">
        <BoxInfo className="startUpInfo">
          {solverInfo
            .filter((info) => info.title && info.para)
            .map((info, index) => {
              return (
                <Snippet key={index} title={info.title} para={info.para} />
              );
            })}
        </BoxInfo>

        <BoxInfo className="personInfo">
          {contactInfo
            .filter((info) => info.title && info.para)
            .map((info, index) => (
              <Snippet key={index} title={info.title} para={info.para} />
            ))}
        </BoxInfo>

        {solverSolution.map((block, index) => {
          if (block.challenges) {
            return (
              <BoxInfo key={index}>
                <SnippetChallenges
                  key={index}
                  title={block.title}
                  list={block.challenges}
                />
              </BoxInfo>
            );
          }
          if (block.list) {
            return (
              <BoxInfo key={index}>
                <SnippetList
                  key={index}
                  title={block.title}
                  list={block.list}
                />
              </BoxInfo>
            );
          }
          return (
            <BoxInfo key={index}>
              <Snippet key={index} title={block.title} para={block.para} />
            </BoxInfo>
          );
        })}

        {!!solverFounders.length && (
          <BoxInfo className="foundersInfo" title="Founders">
            {solverFounders.map((founder, index) => {
              return <ContactCard key={index} data={founder} />;
            })}
          </BoxInfo>
        )}

        {!!solverMembers.length && (
          <BoxInfo className="teamInfo" title="Team Members">
            {solverMembers.map((member, index) => {
              return <ContactCard key={index} data={member} />;
            })}
          </BoxInfo>
        )}
      </Box>
    </Box>
  );
};

export default LeftSideContent;

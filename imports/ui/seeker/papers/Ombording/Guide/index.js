import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import SVG from "../../../../common/Svg";
import Typography from "../../../../common/Typography";

const Guide = () => {
  const history = useHistory();
  const [done, setDone] = useState(false);
  const [euroro, setEuroror] = useState(-1);
  // ...
  const onCreateNewProgram = () => {
    if (done) return;
    setDone(true);
    Meteor.call("program.insert", { isCFA: false }, (err, id) => {
      if (err) return;
      history.push(`/dashboard/programs/${id}/program-details`);
    });
  };
  const onCreateNewCFA = () => {
    if (done) return;
    setDone(true);
    Meteor.call("program.insert", { isCFA: true }, (err, id) => {
      if (err) return;
      history.push(`/dashboard/call-for-applications/${id}/cfa-details`);
    });
  };
  const onSearchInnovations = () => {
    history.push("/dashboard/search-innovation-agent");
  };
  // ...
  const moves = [
    {
      icon: "/onboardings/open_innovation_program.svg",
      iconH: "/onboardings/open_innovation_program_h.svg",
      title: "Launch a program",
      desc:
        "Start your journey with OIFA and launch your open innovation program! Take few minutes to create it, add your challenges and then get access to multiple ideas and suggestions to improve your innovation. African innovation talents are waiting for your opportunities!",
      handler: onCreateNewProgram,
    },
    {
      icon: "/onboardings/call_for_application.svg",
      iconH: "/onboardings/call_for_application_h.svg",
      title: "Launch a Call for application",
      desc:
        "Start your journey with OIFA and launch your call for  application! Take few minutes to submit your challenge online and then get access to multiple ideas and suggestions to improve your innovation. African innovation talents are waiting for your opportunity!",
      handler: onCreateNewCFA,
    },
    {
      icon: "/onboardings/search_innovation_partners.svg",
      iconH: "/onboardings/search_innovation_partners_h.svg",
      title: "Search for innvation agent",
      desc:
        "Want to connect with some African Innovation talents and discuss with them a potential collaboration? Start by clicking here, mention your criteria, search for the best innovation talents and take the time to connect with them. ",
      handler: onSearchInnovations,
    },
  ];

  // ...
  return (
    <Box className="SeekerGuide">
      <Box className="SeekerGuide__content">
        <Typography
          face="Bold"
          color="#1e2e41"
          size="2.8rem"
          height="3.6rem"
          style={{ textAlign: "center", margin: "0 0 1.7rem 0" }}
        >
          What Can You Do on OIFA?
        </Typography>
        <Typography
          face="Book"
          color="#9ca3af"
          size="1.6rem"
          height="2rem"
          style={{ textAlign: "center", margin: "0 0 5.9rem 0" }}
        >
          On Oifa, you can launch a program, launch a call for application or
          you can search for innovation agent
        </Typography>
        <Box className="SeekerGuide__form">
          {moves.map((move, index) => (
            <Box
              key={index}
              className="__move"
              onClick={move.handler}
              onMouseEnter={() => setEuroror(index)}
              onMouseLeave={() => setEuroror(-1)}
            >
              <Box className="__move__inner">
                <Box style={{ margin: "0 0 1.8rem 0", minHeight: "11rem" }}>
                  <SVG src={euroro === index ? move.iconH : move.icon} />
                </Box>
                <Typography
                  className="__title"
                  face="Bold"
                  color="#1e2e41"
                  size="1.8rem"
                  height="2.3rem"
                  style={{ margin: "0 0 1.8rem 0" }}
                >
                  {move.title}
                </Typography>
                <Typography
                  className="__description"
                  face="Book"
                  color="#9ca3af"
                  size="1.4rem"
                  height="2rem"
                >
                  {move.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Guide;

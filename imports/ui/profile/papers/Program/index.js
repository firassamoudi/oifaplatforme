/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router";
import Scrollbar from "react-scrollbars-custom";

import ProgramsCollection from "/imports/api/Program";
import ProgramTimeline from "/imports/libs/timeline";

import SolverCollection from "../../../../api/Solver";
import HeaderProgram from "../components/HeaderProgram";
import ProgramTabs from "../components/ProgramTabs";
import ProgramOverviewLayout from "../layouts/layout";

const ProgramOverview = ({
  program,
  userId,
  solver,
  progId,
  loading,
  history,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isAdmin = Roles.userIsInRole(userId, ["ADMIN_ADMIN", "ADMIN_MEMBER"]);
  const isSolver = Roles.userIsInRole(userId, ["SOLVER_OWNER"]);
  // ...
  const hasAccepted = program?.accepted;
  // ...
  let hasApplied = false;
  let isEligible = false;
  if (isSolver) {
    hasApplied = solver?.hasApplied({ progId });
    // - isEligible
    const sType = solver?.type;
    program?.targetAudience?.forEach((target) => {
      if (target.value === sType) {
        isEligible = true;
      }
    });
  }
  // ...
  const timeline = new ProgramTimeline({ data: program?.timeline ?? [] });
  const isInAppPhaseOut = timeline.isPhaseOut("applications");
  // ...
  const onProgramApply = () => {
    if (hasApplied || !isEligible || isInAppPhaseOut) return;
    setIsLoading(true);
    Meteor.call("application.insert", { progId }, (err, res) => {
      setIsLoading(false);
      if (err) return;
      const appId = res.appId;
      history.push(
        `/dashboard/program/${progId}/applications/${appId}/details`
      );
    });
  };
  const onAdminAccept = () => {
    if (hasAccepted) return;
    setIsLoading(true);
    Meteor.call("program.admin.accept", { progId }, () => {
      setIsLoading(false);
    });
  };
  // ...
  const [fixed, setfixed] = useState(false);
  const [sections, setSections] = useState([]);
  // ...
  const scrollBarRef = useRef();
  const programTabsRef = useRef();
  // ...
  const sectionData = (id) => {
    const ele = document.getElementById(id);
    const posTop = ele.getBoundingClientRect().top;
    return {
      posTop,
      handler: () => {
        scrollBarRef.current.scrollTo(0, posTop - 200);
      },
    };
  };
  // ...
  const onScrollBar = () => {
    // - Show FixedHeader
    const bClientRect = programTabsRef.current.getBoundingClientRect();
    setfixed(bClientRect.y < 0);
  };
  const onNavigateHandler = (index) => {
    if (loading) return;
    const section = sections[index];
    section.handler();
  };
  // - Set Sections
  useEffect(() => {
    const sections = [
      { ...sectionData("program-context") },
      { ...sectionData("program-timeline") },
      { ...sectionData("program-target-audience") },
      { ...sectionData("program-faq") },
      { ...sectionData("program-challenges") },
      { ...sectionData("program-incentives") },
      { ...sectionData("program-copyright") },
    ];
    // ...
    setSections(sections);
  }, [program]);
  // ...
  useEffect(() => {
    Meteor.call("solver.program.visited", { progId });
  }, []);
  // ...
  return (
    <Box className="ProgramOverview">
      <Scrollbar
        momentum
        onScroll={onScrollBar}
        ref={scrollBarRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ProgramOverviewLayout>
          <HeaderProgram
            data={program ?? {}}
            isSolver={isSolver}
            isAdmin={isAdmin}
            canApply={hasApplied}
            isEligible={isEligible}
            isInAppPhaseOut={isInAppPhaseOut}
            canAccept={hasAccepted}
            onProgramApply={onProgramApply}
            onAdminAccept={onAdminAccept}
            isLoading={isLoading}
          />

          <ProgramTabs
            data={program ?? {}}
            isSolver={isSolver}
            isAdmin={isAdmin}
            canApply={hasApplied}
            isEligible={isEligible}
            isInAppPhaseOut={isInAppPhaseOut}
            canAccept={hasAccepted}
            onProgramApply={onProgramApply}
            onAdminAccept={onAdminAccept}
            isLoading={isLoading}
            // ...
            fixed={fixed}
            scrollBarRef={scrollBarRef}
            programTabsRef={programTabsRef}
            onNavigateHandler={onNavigateHandler}
          />
        </ProgramOverviewLayout>
      </Scrollbar>
    </Box>
  );
};

export default withRouter(
  withTracker(({ ...props }) => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    let solver = null;
    const progId = props.match.params.id;
    const handle = Meteor.subscribe("program-overview", { progId });
    const loading = !handle.ready();
    if (loading) {
      return { user, userId, solver, progId, program: {}, loading };
    }
    const program = ProgramsCollection.findOne(progId);
    const solverId = user?.solverId;
    if (solverId) {
      solver = SolverCollection.findOne();
    }
    // ...
    return {
      user,
      solver,
      userId,
      progId,
      program,
      loading,
      ...props,
    };
  })(ProgramOverview)
);

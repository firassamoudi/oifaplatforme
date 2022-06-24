import Challenges from "./Challenges";
import Context from "./Context";
import Copyright from "./Copyright";
import FAQ from "./FAQ";
import Incentive from "./Incentive";
import TargetAudience from "./TargetAudience";
import Timeline from "./TimeLine";

export default function (data, isCFA) {
  const programTabs = [
    {
      label: "Context",
      Component: Context,
      props: { id: "program-context", data },
    },
    {
      label: "Timeline",
      Component: Timeline,
      props: { id: "program-timeline", data },
    },
    {
      label: "Target audience",
      Component: TargetAudience,
      props: { id: "program-target-audience", data },
    },
    {
      label: "FAQ",
      Component: FAQ,
      props: { id: "program-faq", data },
    },
    {
      label: "Challenges",
      Component: Challenges,
      props: { id: "program-challenges", data },
    },
    {
      label: "Incentive",
      Component: Incentive,
      props: { id: "program-incentives", data },
    },
    {
      label: "Copyright",
      Component: Copyright,
      props: { id: "program-copyright", data },
    },
  ];
  // - isCFA
  if (isCFA) {
    delete programTabs[4];
  }
  return programTabs;
}

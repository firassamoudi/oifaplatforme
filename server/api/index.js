import bodyParser from "body-parser";
import connectRoute from "connect-route";
import { Accounts } from "meteor/accounts-base";

import FilesCollection from "/imports/api/File";
import ProgramsCollection from "/imports/api/Program";
import SeekerCollection from "/imports/api/Seeker";
import SubscribeCollection from "/imports/api/Subscribe";
import ProgramTimeline from "/imports/libs/timeline";

WebApp.connectHandlers.use(bodyParser.json());

WebApp.connectHandlers.use(
  connectRoute(function (router) {
    router.post("/subscriber", function (req, res) {
      const { email } = req.body;
      const date = new Date();
      // ...
      const found = SubscribeCollection.findOne({ email });
      // ...
      if (!found) {
        SubscribeCollection.insert({ email, date });
        Accounts.sendSubscriberEmail(email);
      }
      // ...
      return res.end(JSON.stringify({ success: true }));
    });
    // ...
    router.post("/book-a-demo", function (req, res) {
      res.end(JSON.stringify({ success: true }));
      // ...
      Accounts.sendDemoEmail(req.body);
    });
    // ...
    router.post("/contact-us", function (req, res) {
      res.end(JSON.stringify({ success: true }));
      // ...
      Accounts.sendContactEmail(req.body);
    });
    // ...
    router.get("/challenges", function (req, res) {
      const chls = ProgramsCollection.find({ accepted: true }).fetch();
      const challenges = chls.map((data) => {
        const timeline = new ProgramTimeline({ data: data.timeline });
        const appPhase = timeline.getPhase("applications");
        const date = appPhase.start;
        const country = (data.geographicalScope || [])
          .map((c) => c.label)
          .toString()
          .replace(/,/g, ", ");
        const target = (data.targetAudience || [])
          .map((t) => t.label)
          .toString()
          .replace(/,/g, ", ");
        const seeker = SeekerCollection.findOne({ _id: data.seekerId });
        // ...
        const srcImg = FilesCollection.findOne({ _id: data.imgId });
        // ...
        return {
          title: data.title,
          date,
          country,
          target,
          hostedBy: seeker.getOrgName(),
          image: srcImg.link(),
        };
      });
      // ...
      return res.end(JSON.stringify({ challenges }));
    });
  })
);

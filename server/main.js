/* eslint-disable simple-import-sort/sort */
import "./emails";
// ...
import "/imports/api/User/methods";
import "/imports/api/User/publications";
// ...
import "/imports/api/Application/methods";
import "/imports/api/Application/publications";
// ...
import "/imports/api/Seeker/methods";
import "/imports/api/Seeker/publications";
// ...
import "/imports/api/SeekerPlan/methods";
// ...
import "/imports/api/Solver/methods";
import "/imports/api/Solver/publications";
// ...
import "/imports/api/Program/methods";
import "/imports/api/Program/publications";
// ...
import "/imports/api/Workplace/methods";
import "/imports/api/Workplace/publications";
// ...
import "/imports/api/File/publications";
// ...
import "/imports/api/Evaluator/publications";
// ...
import "/imports/api/Room/publications";
import "/imports/api/Room/methods";
// ...
import "/imports/api/RoomMessage/methods";
// ...
import "/imports/api/Teams/methods";
import "/imports/api/Teams/publications";
// ...
import "/imports/api/Subscribe/publications";
// ...
import "/imports/api/Notification";
import "/imports/api/Notification/methods";
import "/imports/api/Notification/publications";
// - api
import "./api";
// - Jobs
import "./crons";
// - Migrations
// import "./migrations";

import { Meteor } from "meteor/meteor";

import roles from "./roles";

Meteor.startup(() => {
  // - CronJobs
  SyncedCron.start();
  // - Roles
  roles.forEach((role) => {
    if (!Meteor.roles.findOne(role)) {
      Roles.createRole(role);
    }
  });
  // - Add Super Admin
  const superAdmin = Meteor.roleAssignment.findOne({
    "role._id": "ADMIN_ADMIN",
  });
  if (!superAdmin) {
    const username = "admin@oifa.tech";
    const userData = {
      username,
      email: username,
      password: username,
      profile: {
        firstName: "OIFA",
        lastName: "Admin",
      },
    };
    const userId = Accounts.createUser(userData);
    Roles.addUsersToRoles(userId, ["ADMIN_ADMIN"], Roles.GLOBAL_GROUP);
    Meteor.users.update(userId, {
      $set: {
        accepted: true,
        omborded: true,
      },
    });
  }
});

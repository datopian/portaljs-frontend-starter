import { format } from "timeago.js";
import { Activity } from "@portaljs/ckan";

interface ActivityStreamProps {
  activities: Array<Activity>;
}
export default function ActivityStream({ activities }: ActivityStreamProps) {
  return (
    <div className="py-8 w-full h-[50vh]">
      {activities.map((activity: Activity) => (
        <div key={activity.id}>
          <div className="flex flex-row items-start mb-10">
            {activity.user_data?.image_display_url ? (
              <div className="w-13 rounded-full">
                <img
                  src={activity.user_data.image_display_url}
                  alt="Profile picture of user"
                />
              </div>
            ) : (
              <div className="bg-accent p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            )}
            <p className="mt-2 ml-3 activity-string">
              {activity.user_data?.fullname
                ? activity.user_data?.fullname
                : "A user"}{" "}
              {activity.activity_type}{" "}
              <a href="#">{activity.data?.package?.title}</a>{" "}
              <span className="text-xs">{format(activity.timestamp)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

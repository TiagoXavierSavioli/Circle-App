import main_root from "./components/roots/profile-main_root";
import statistics_container from "./components/statistics/profile-statistics-container";
import statistics_followers from "./components/statistics/profile-statistics-followers";
import statistics_likes from "./components/statistics/profile-statistics-likes";
import statistics_views from "./components/statistics/profile-statistics-views";

export const Profile = {
    MainRoot: main_root,
    Statistics: {
        Container: statistics_container,
        Followers: statistics_followers,
        Likes: statistics_likes,
        Views: statistics_views
    }
}
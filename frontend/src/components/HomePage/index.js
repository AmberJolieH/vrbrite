import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Layout";
import { ReactComponent as ImageBanner } from "../../images/vrdude.svg";
import { EventList } from "../EventsPage";
import "./HomePage.css";
import * as eventActions from "../../store/events";
import ReactPlayer from "react-player"

const HomePage = () => {
	const dispatch = useDispatch();
	const eventsByEventCategoryId = useSelector(
		(state) => state.events.eventsByEventCategoryId
	);

	useEffect(() => {
		dispatch(eventActions.fetchEventsIfNeeded(""));
	}, [dispatch]);

	const { isFetching, items: events } = eventsByEventCategoryId[""] || {
		isFetching: true,
		items: [],
	};

	return (
		<Layout>
			<div className="vr-guy">
				{/* <ImageBanner
					alt="vr guy"
					className="home-banner__image"

				/> */}
			</div>
			<div className="home-banner">
				<p className="player-wrapper">
					<ReactPlayer
						url='https://www.youtube.com/watch?v=_d-hMZaU5Po'
						playing="true"
						loop="true"
						volume="null"
						alight-items="center"
						border-radius="5px"
					/>
				</p>
				<p className="home-banner__text">
					Discover Virtual Reality
				</p>

			</div>

				<p className="event-category-links">
					<h2 className="upcoming-events">
						Upcoming Events:
						</h2>
					<EventList events={events.slice(0, 8)} />
				</p>

		</Layout>
	);
};

export default HomePage;

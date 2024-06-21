import React from 'react';
import ReactPlayer from 'react-player';
import sdgLogo from './sdg.png';
import './Ghar.css';

const Ghar = () => {
  return (
    <div className="ghar-container">
      <div className="contentt-container">
        <div className="headers">
          <img src={sdgLogo} alt="SDG 13 Logo" className="logo" />
          <h1 className="title">Unite for Climate: Empowering Citizens to Cool The Globe Together</h1>
        </div>
        <div className="video-container">
          <iframe
            width="920"
            height="505"
            src="https://www.youtube.com/embed/jAa58N4Jlos?autoplay=1&start=10&si=TFuV-J-xGDLx0GaS"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>


        </div>

        <div className="goal-intro-container">
          <h2 style={{ textAlign: "center" }} className="section-title">Goal 13: Combat Climate Change</h2>
          <div className="introduction">
            <h3>Introduction</h3>
            <p style={{fontWeight:'bold'}}>
              Climate change is a real and undeniable threat to our entire civilization. The effects are already visible and will be catastrophic unless we act now. Through education, innovation and adherence to our climate commitments, we can make the necessary changes to protect the planet. These changes also provide huge opportunities to modernize our infrastructure which will create new jobs and promote greater prosperity across the globe.
            </p>
              <p>
                There is no country that is not experiencing the drastic effects of climate change. Greenhouse gas emissions are more than 50 percent higher than in 1990. Global warming is causing long-lasting changes to our climate system, which threatens irreversible consequences if we do not act.
              </p>
              <p>
                The annual average economic losses from climate-related disasters are in the hundreds of billions of dollars. This is not to mention the human impact of geo-physical disasters, which are 91 percent climate-related, and which between 1998 and 2017 killed 1.3 million people, and left 4.4 billion injured. The goal aims to mobilize US$100 billion annually by 2020 to address the needs of developing countries to both adapt to climate change and invest in low-carbon development.
              </p>
              <p>
                Supporting vulnerable regions will directly contribute not only to Goal 13 but also to the other SDGs. These actions must also go hand in hand with efforts to integrate disaster risk measures, sustainable natural resource management, and human security into national development strategies. It is still possible, with strong political will, increased investment, and using existing technology, to limit the increase in global mean temperature to two degrees Celsius above pre-industrial levels, aiming at 1.5°C, but this requires urgent and ambitious collective action.
              </p>
          </div>
        </div>

        <div className="targets-container">
          <h2 className="section-title">Goal Targets</h2>
          <div className="target-box">
            <p>
              1. Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries
              <br />
              2. Integrate climate change measures into national policies, strategies and planning
              <br />
              3. Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning
              <br />
              4. Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible
              <br />
              5. Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ghar;

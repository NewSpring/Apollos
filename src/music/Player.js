import React from 'react';
import DockableAudioPlayer from '@ui/DockableAudioPlayer';

const getLinkForTrack = ({ id, currentTrack }) => `/music/${id}/${encodeURIComponent(currentTrack.title)}`;

const Player = props => (
  <DockableAudioPlayer
    getLinkForTrack={getLinkForTrack}
    {...props}
  />
);

export default Player;

const getRoomId = (firstID, secondId) => {
  const sortId = [firstID, secondId].sort();
  const roomId = sortId.join("-");
  return roomId;
};

export default getRoomId;

import React, { useContext, useState } from "react";
import { MovieContext } from "../Contexts/MovieContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import MovieThumbNail from "../Movie/MovieThumbNail";

const WatchList = () => {
  const { myWatchList, setMyWatchList, loadedMovie } = useContext(MovieContext);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(myWatchList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMyWatchList(items);
  }

  return (
    <Wrapper>
      <WatchListTitle>My WatchList</WatchListTitle>
      <MywatchListWrapper>
        {loadedMovie && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="myWatchList" direction="horizontal">
              {(provided) => (
                <MovieList {...provided.droppableProps} ref={provided.innerRef}>
                  {myWatchList?.map((movie, index) => {
                    const movieId = Object.keys(movie);
                    return (
                      <Draggable
                        key={movieId}
                        draggableId={movieId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <MovieThumbNail
                              url={movie[movieId[1]].title.image.url}
                              movieId={movieId[1]}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </MovieList>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </MywatchListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ThumbnailImage = styled.img`
  height: 100px;
  width: 100px;
`;
const MyWatchList = styled.ul``;
const MywatchListWrapper = styled.div`
  display: flex;
  border: 5px solid pink;
  width: fit-content;
`;
const WatchListTitle = styled.div``;
const MovieList = styled.ul`
  height: fit-content;
  width: fit-content;
  display: flex;
`;
export default WatchList;

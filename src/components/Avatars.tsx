import { styled } from '@mui/material/styles';
import { useState } from 'react';
import classNames from 'classnames';

const BASE_URL = import.meta.env.BASE_URL;

const StyledAvatars = styled('div')`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  flex-wrap: wrap;
  gap: 5px;

  img {
    width: 50px;
    height: 50px;
  }

  .avatar {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    border-radius: 50%;

    &.selected {
      border: 2px solid ${(props) => props.theme.palette.primary.main};
    }
  }
`;

interface IPropsAvatars {
  selected: string;
  onSelect: (newAvatar: string) => void;
}

const Avatars = ({ selected, onSelect }: IPropsAvatars) => {
  return (
    <StyledAvatars className="Avatars">
      {Array(16)
        .fill(0)
        .map((av, idx) => {
          const avatarPath = `avatars/64_${idx + 1}.png`;

          return (
            <div key={idx} onClick={() => onSelect(avatarPath)} className={classNames('avatar', { selected: selected === avatarPath })}>
              <img src={BASE_URL + avatarPath} alt="" />
            </div>
          );
        })}
      {selected}
    </StyledAvatars>
  );
};

export default Avatars;

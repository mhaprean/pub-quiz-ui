import avatar1 from '../assets/avatars/64_1.png';
import avatar2 from '../assets/avatars/64_2.png';
import avatar3 from '../assets/avatars/64_3.png';
import avatar4 from '../assets/avatars/64_4.png';
import avatar5 from '../assets/avatars/64_5.png';
import avatar6 from '../assets/avatars/64_6.png';
import avatar7 from '../assets/avatars/64_7.png';
import avatar8 from '../assets/avatars/64_8.png';
import avatar9 from '../assets/avatars/64_9.png';
import avatar10 from '../assets/avatars/64_10.png';
import avatar11 from '../assets/avatars/64_11.png';
import avatar12 from '../assets/avatars/64_12.png';
import avatar13 from '../assets/avatars/64_13.png';
import avatar14 from '../assets/avatars/64_14.png';
import avatar15 from '../assets/avatars/64_15.png';
import avatar16 from '../assets/avatars/64_16.png';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import classNames from 'classnames';

const avatarsArray = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
];

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

const Avatars = () => {
  const [selected, setSelected] = useState('');
  return (
    <StyledAvatars className="Avatars">
      {avatarsArray.map((av, idx) => (
        <div key={idx} onClick={() => setSelected(av)} className={classNames('avatar', { selected: selected === av })}>
          <img src={av} alt="" />
        </div>
      ))}
    </StyledAvatars>
  );
};

export default Avatars;

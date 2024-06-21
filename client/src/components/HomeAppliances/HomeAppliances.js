import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AcUnit as AC, DevicesOther as Appliances, Microwave as Heater, HotTub as WaterHeater, Lightbulb as LightbulbIcon } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)({
  padding:0,
  width:'100%',
  flexGrow: 1,
  backgroundColor: '#8bc34a', // Light Green

});

const NavItem = styled('div')(({ active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  borderBottom: active ? '4px solid #ccc' : 'none', // Subtle gray border if active
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem', // Increase icon size
  },
  '& .MuiTypography-body1': {
    fontSize: '1.5rem', // Increase text size
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (path, item) => {
    navigate(path);
    setActiveItem(item);
  };

  return (
    <StyledAppBar >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <NavItem active={activeItem === 'appliances'} onClick={() => handleItemClick('/appliances', 'appliances')}>
          <Appliances />
          <Typography variant="body1">Appliances</Typography>
        </NavItem>
        <NavItem active={activeItem === 'ac'} onClick={() => handleItemClick('/ac', 'ac')}>
          <AC />
          <Typography variant="body1">AC</Typography>
        </NavItem>
        <NavItem active={activeItem === 'heater'} onClick={() => handleItemClick('/heater', 'heater')}>
          <Heater />
          <Typography variant="body1">Heater</Typography>
        </NavItem>
        <NavItem active={activeItem === 'water-heater'} onClick={() => handleItemClick('/water-heater', 'water-heater')}>
          <WaterHeater />
          <Typography variant="body1">Water Heater</Typography>
        </NavItem>
        <NavItem active={activeItem === 'lighting'} onClick={() => handleItemClick('/lighting', 'lighting')}>
          <LightbulbIcon />
          <Typography variant="body1">Lighting</Typography>
        </NavItem>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;

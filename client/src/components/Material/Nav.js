import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';
import { ProductionQuantityLimits as ProductsIcon, Widgets as MaterialsIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  padding:0,
  width:'100%',
  // margin:0,
  flexGrow: 1,
  backgroundColor: '#8bc34a', // Light Green
});

const NavItem = styled('div')(({ active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor: 'pointer',
  color: 'white',
  borderBottom: active ? '3px solid #ccc' : 'none', // Subtle gray border if active
  '& .MuiSvgIcon-root': {
    fontSize: '2.5rem', // Increase icon size
    color: 'inherit', // Inherit color from parent
  },
  '& .MuiTypography-body1': {
    fontSize: '1.5rem', // Increase text size
    color: 'inherit', // Inherit color from parent
  },
}));

const StyledLink = styled(Link)({
  textDecoration: 'none', // Remove underline
  color: 'inherit', // Inherit color from parent
});

const Material_Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <StyledAppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <NavItem active={activeItem === 'products'} onClick={() => handleItemClick('products')}>
          <StyledLink to="/products">
            <ProductsIcon />
            <Typography variant="body1">Products</Typography>
          </StyledLink>
        </NavItem>
        <NavItem active={activeItem === 'materials'} onClick={() => handleItemClick('materials')}>
          <StyledLink to="/material">
            <MaterialsIcon />
            <Typography variant="body1">Materials</Typography>
          </StyledLink>
        </NavItem>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Material_Navbar;

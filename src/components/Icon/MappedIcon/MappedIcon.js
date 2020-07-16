/* React */
import React from 'react';

/* Material UI */
import Code from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ImageIcon from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';

/* Mapping Icon */
const mapNameToIcon = name => {
  switch( name ){
    case "Image":
      return ImageIcon;
    case "Settings":
      return SettingsIcon;
    case "Dashboard":
      return DashboardIcon;
    case "Code":
      return Code;
    default:
      return null;
  }
}

/* Sub Component */
const LoadedIcon = ({ name, className }) => {
  /* Mapped Icon */
  const Icon = mapNameToIcon( name );
  
  /* Renderer */
  if( !Icon ){ return null }
  
  return (
    <div className={ className }>
      <Icon />
    </div>
  );
};


/* Exports */
export default LoadedIcon;
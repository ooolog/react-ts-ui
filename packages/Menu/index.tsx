
import { FC } from 'react'
import Menus, { IMenuProps } from  './src/Menu';
import MenuItem, { IMenuItemProps } from './src/MenuItem';
import SubMenu, { ISubMentProps } from './src/SubMenu';
export type IMenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>,
  SubMenu: FC<ISubMentProps>
}
const Menu = Menus as IMenuComponent
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
export {
    Menu
}
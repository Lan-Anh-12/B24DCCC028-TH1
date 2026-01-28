import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/doanso">Đoán số</Link>
        </li>
        <li>
          <Link to="/todolist">Todo List</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

import React from "react";
import s from "./Users.module.scss";
import {UsersPageType, UsersType} from "../../redux/users-reducer";
import axios, {AxiosResponse} from "axios";
import userPhoto from '../../assets/images/user.png'

type UsersPropsType = {
   users: UsersType[]
   follow: (userId: number) => void
   unFollow: (userId: number) => void
   setUsers: (users: UsersType[]) => void
   totalUsersCount: number
   pageSize: number
   currentPage: number
   setCurrentPage: (pageNumber: number) => void
   setTotalUsersCount: (totalUsersCount: number) => void
}

export class Users extends React.Component<UsersPropsType> {

   componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
         .then((response: AxiosResponse<UsersPageType>) => {
            this.props.setUsers(response.data.items)
            this.props.setTotalUsersCount(response.data.totalCount)
         });
   }

   onPageChanged = (pageNumber: number) => {
      this.props.setCurrentPage(pageNumber)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
         .then((response: AxiosResponse<UsersPageType>) => {
            this.props.setUsers(response.data.items)
         });
   }

   render() {
      let {
         users,
         unFollow,
         follow,
         totalUsersCount,
         pageSize,
         currentPage,
      } = this.props;

      const pageCount = Math.ceil(totalUsersCount / pageSize);
      const pages = [];
      for (let i = 1; i <= pageCount; i++) {
         pages.push(i);
      }

      const usersList = users.map(u => {
            return (
               <div key={u.id} className={s.user__body}>
                  <div className={s.user__img}>
                     <img src={u.photos.small ? u.photos.small : userPhoto} alt={'avatar'}/>
                  </div>
                  <div className={s.user__item}>
                     <div className={s.user__info}>
                        <div className={s.user__name}>{u.name}</div>
                        <div className={s.user__status}>{u.status}</div>
                     </div>
                     <div className={s.user__button}>
                        {u.followed
                           ? <button className={s.btn} onClick={() => unFollow(u.id)}>Unfollow</button>
                           : <button className={`${s.btn} ${s.btn__bl}`}
                                     onClick={() => follow(u.id)}>Follow</button>}

                     </div>
                  </div>
                  <div className={s.user__location}>
                     <div>{'u.location.country'}</div>
                     <div>{'u.location.city'}</div>
                  </div>
               </div>
            )
         }
      )

      return (
         <div className={s.user}>

            {usersList}
            <div className={s.paginationContainer}>
               {
                  pages.map(p => {
                     return <div key={p}
                                 className={currentPage === p ? `${s.pagination} ${s.selected}` : s.pagination}
                                 onClick={() => {
                                    this.onPageChanged(p)
                                 }}
                     >{p}</div>
                  })
               }
            </div>
         </div>
      )
   }
}

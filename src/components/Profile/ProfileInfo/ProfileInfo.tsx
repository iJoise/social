import React from 'react';
import style from './ProfileInfo.module.scss';
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import profileHeader from '../../../assets/images/vseti.jpeg';
import instagram from '../../../assets/images/icon/instagram.png';
import facebook from '../../../assets/images/icon/facebook.png';
import github from '../../../assets/images/icon/github.png';
import twitter from '../../../assets/images/icon/twitter.png';
import website from '../../../assets/images/icon/website.png';
import vk from '../../../assets/images/icon/vk.png';
import youtube from '../../../assets/images/icon/youtube.png';


type ProfileInfoPropsType = {
   profile: UserProfileType | null
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {

   const {profile} = props;

   if (!profile) {
      return <Preloader/>
   }

   return (
      <>
         <div className={style.content_img}>
            <img src={profileHeader} alt="headImage"/>
         </div>
         <div className={style.profile}>
            <img
               src={profile.photos.large ? profile.photos.large : userPhoto}
               alt="this is avatar"
            />
            <div className={style.profile__body}>
               <h3>{profile.fullName}</h3>
               <p className={style.profile__status}>{profile.aboutMe}</p>
               <div className={style.profile__jobInfo}>
                  <p className={style.profile__jobSearch}>В поиске работы:
                     <span>{profile.lookingForAJob ? '✅' : '❌'}</span></p>
                  {
                     profile.lookingForAJobDescription && <p className={style.profile__jobSearch}>
                        {profile.lookingForAJobDescription}
                     </p>
                  }
               </div>
               <div className={style.profile__social}>
                  {profile.contacts.github && <a href={profile.contacts.github}><img src={github} alt="github"/></a>}
                  {profile.contacts.facebook &&
                  <a href={profile.contacts.facebook}><img src={facebook} alt="facebook"/></a>}
                  {profile.contacts.instagram &&
                  <a href={profile.contacts.instagram}><img src={instagram} alt="instagram"/></a>}
                  {profile.contacts.twitter &&
                  <a href={profile.contacts.twitter}><img src={twitter} alt="twitter"/></a>}
                  {profile.contacts.vk && <a href={profile.contacts.vk}><img src={vk} alt="twitter"/></a>}
                  {profile.contacts.youtube &&
                  <a href={profile.contacts.youtube}><img src={youtube} alt="youtube"/></a>}
                  {profile.contacts.website &&
                  <a href={profile.contacts.website}><img src={website} alt="website"/></a>}
               </div>
            </div>
         </div>
      </>
   );
};

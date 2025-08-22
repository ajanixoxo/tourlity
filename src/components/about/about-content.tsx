/* eslint-disable @next/next/no-img-element */
import CTA from "../landing/cta";
import Button from "../root/button"

type TeamMember = {
  name: string;
  title: string;
  description: string;
  image: string;
};



export function AboutContent() {
  const values = [
    {
      icon: <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 22H7.09087C5.54549 22 4.31631 21.248 3.21266 20.1966C0.953365 18.0441 4.6628 16.324 6.07757 15.4816C8.03058 14.3187 10.2927 13.8404 12.5 14.0466" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 6.5C16 8.98528 13.9853 11 11.5 11C9.01472 11 7 8.98528 7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5Z" stroke="#CA3F33" strokeWidth="1.5" />
        <path d="M15.515 15.3866C16.5876 14.7469 17.5238 15.0047 18.0863 15.4153C18.3169 15.5837 18.4322 15.6679 18.5 15.6679C18.5678 15.6679 18.6831 15.5837 18.9137 15.4153C19.4762 15.0047 20.4124 14.7469 21.485 15.3866C22.8928 16.2261 23.2113 18.9958 19.9642 21.3324C19.3457 21.7775 19.0365 22 18.5 22C17.9635 22 17.6543 21.7775 17.0358 21.3324C13.7887 18.9958 14.1072 16.2261 15.515 15.3866Z" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      ,
      title: "Authenticity",
      description: "We believe in real, unscripted experiences that showcase the true essence of local cultures and communities.",
    },
    {
      icon: <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 18C8.91684 17.0229 10.223 16.5115 11.5315 16.5002M13.5 12C13.5 13.1046 12.6187 14 11.5315 14C10.4444 14 9.56307 13.1046 9.56307 12C9.56307 10.8954 10.4444 10 11.5315 10C12.6187 10 13.5 10.8954 13.5 12Z" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 4.00116C6.35561 4.01101 4.94101 4.10348 4.02513 4.97116C3 5.94233 3 7.50541 3 10.6316V15.3684C3 18.4946 3 20.0576 4.02513 21.0288C5.05025 22 6.70017 22 10 22H12M14 4.00116C16.6444 4.01101 18.059 4.10348 18.9749 4.97116C20 5.94233 20 7.50541 20 10.6316V11.5" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.27216 3.63163C9.3681 3.21682 9.41608 3.00942 9.50821 2.84004C9.72285 2.44546 10.1188 2.15548 10.5914 2.0467C10.7943 2 11.0296 2 11.5 2C11.9704 2 12.2057 2 12.4086 2.0467C12.8812 2.15548 13.2771 2.44545 13.4918 2.84004C13.5839 3.00942 13.6319 3.21682 13.7278 3.63163L13.8111 3.99176C13.9813 4.72744 14.0664 5.09528 13.938 5.37824C13.8549 5.5615 13.7132 5.71842 13.531 5.82911C13.2496 6 12.8324 6 11.9981 6H11.0019C10.1676 6 9.75038 6 9.46901 5.82911C9.28677 5.71842 9.1451 5.5615 9.06197 5.37824C8.93361 5.09528 9.01869 4.72744 9.18886 3.99176L9.27216 3.63163Z" stroke="#CA3F33" strokeWidth="1.5" />
        <path d="M16.9896 17.7675C16.6157 17.5892 16.1681 17.7477 15.9898 18.1215C15.8114 18.4954 15.9699 18.943 16.3437 19.1214L16.6667 18.4444L16.9896 17.7675ZM17.5556 19.3333L16.9094 19.7141C17.05 19.9528 17.3109 20.0945 17.5877 20.0826C17.8645 20.0708 18.1123 19.9072 18.232 19.6573L17.5556 19.3333ZM19.6888 17.7715C20.0536 17.5752 20.1901 17.1203 19.9937 16.7556C19.7974 16.3909 19.3425 16.2544 18.9778 16.4507L19.3333 17.1111L19.6888 17.7715ZM22 18H21.25C21.25 19.7949 19.7949 21.25 18 21.25V22V22.75C20.6234 22.75 22.75 20.6234 22.75 18H22ZM18 22V21.25C16.2051 21.25 14.75 19.7949 14.75 18H14H13.25C13.25 20.6234 15.3766 22.75 18 22.75V22ZM14 18H14.75C14.75 16.2051 16.2051 14.75 18 14.75V14V13.25C15.3766 13.25 13.25 15.3766 13.25 18H14ZM18 14V14.75C19.7949 14.75 21.25 16.2051 21.25 18H22H22.75C22.75 15.3766 20.6234 13.25 18 13.25V14ZM16.6667 18.4444C16.3437 19.1214 16.3435 19.1212 16.3432 19.1211C16.3432 19.1211 16.3429 19.121 16.3428 19.1209C16.3425 19.1207 16.3422 19.1206 16.3419 19.1205C16.3413 19.1202 16.3407 19.1199 16.3401 19.1196C16.3391 19.1191 16.3381 19.1186 16.3372 19.1182C16.3355 19.1174 16.3342 19.1167 16.3334 19.1163C16.3317 19.1155 16.3318 19.1154 16.3333 19.1163C16.3365 19.118 16.3458 19.1231 16.3602 19.1319C16.389 19.1496 16.4372 19.1814 16.4962 19.2293C16.6146 19.3251 16.7724 19.4816 16.9094 19.7141L17.5556 19.3333L18.2017 18.9526C17.9577 18.5385 17.6711 18.2505 17.4403 18.0636C17.3247 17.97 17.2221 17.9008 17.1438 17.8529C17.1046 17.8289 17.0712 17.81 17.0451 17.7959C17.0321 17.7889 17.0208 17.7831 17.0115 17.7783C17.0069 17.776 17.0027 17.7739 16.999 17.7721C16.9972 17.7712 16.9955 17.7704 16.9939 17.7696C16.9931 17.7692 16.9924 17.7689 16.9917 17.7685C16.9913 17.7683 16.991 17.7682 16.9906 17.768C16.9904 17.7679 16.9902 17.7678 16.9901 17.7678C16.9898 17.7676 16.9896 17.7675 16.6667 18.4444ZM17.5556 19.3333C18.232 19.6573 18.2319 19.6574 18.2319 19.6575C18.2319 19.6575 18.2318 19.6576 18.2318 19.6577C18.2317 19.6578 18.2317 19.6579 18.2317 19.6579C18.2316 19.658 18.2316 19.658 18.2317 19.6579C18.2318 19.6577 18.2321 19.6571 18.2326 19.6561C18.2335 19.6541 18.2353 19.6506 18.2377 19.6456C18.2426 19.6356 18.2505 19.6198 18.2611 19.5989C18.2824 19.557 18.3147 19.4949 18.3566 19.418C18.4409 19.2635 18.5621 19.0532 18.7097 18.8297C19.0274 18.3488 19.3854 17.9348 19.6888 17.7715L19.3333 17.1111L18.9778 16.4507C18.32 16.8049 17.7891 17.502 17.4582 18.0029C17.2815 18.2703 17.1386 18.5185 17.0397 18.6998C16.9901 18.7908 16.951 18.8659 16.9239 18.9193C16.9103 18.946 16.8997 18.9673 16.8922 18.9826C16.8884 18.9902 16.8855 18.9963 16.8833 19.0008C16.8822 19.003 16.8813 19.0049 16.8806 19.0063C16.8803 19.007 16.88 19.0076 16.8797 19.0081C16.8796 19.0084 16.8795 19.0086 16.8794 19.0088C16.8793 19.0089 16.8793 19.0091 16.8793 19.0091C16.8792 19.0092 16.8791 19.0094 17.5556 19.3333Z" fill="#CA3F33" />
      </svg>

      ,
      title: "Trust & Saftey",
      description: "We prioritize the safety and well-being of our community through careful vetting and support.",
    },
    {
      icon: <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 9C12.5 4.5 14.5 4 16.5 4C16.5 7 15 9 12.5 9ZM12.5 9C12.5 4.5 10.5 4 8.5 4C8.5 7 10 9 12.5 9Z" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.5 4C10.5 4 11 2.5 12.5 2C14 2.5 14.5 4 14.5 4" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 9V15" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.5 13C12.75 12.3333 13.7 11 15.5 11" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.6509 15H11.3491C9.29675 15 8.27055 15 7.7641 15.5967C7.25765 16.1934 7.53957 17.0703 8.1034 18.8242L8.19704 19.1154C8.64071 20.4955 8.86255 21.1855 9.45349 21.5878L9.47997 21.6055C10.0775 22 10.885 22 12.5 22C14.115 22 14.9225 22 15.52 21.6055L15.5465 21.5878C16.1375 21.1855 16.3593 20.4955 16.803 19.1154L16.8966 18.8242C17.4604 17.0703 17.7423 16.1934 17.2359 15.5967C16.7294 15 15.7033 15 13.6509 15Z" stroke="#CA3F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      ,
      title: "Sustainability",
      description: "We promote responsible tourism that benefits local communities and preserves cultural heritage.",
    },

  ]
  const impacts = [
    {
      icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.774 18C21.5233 18 22.1193 17.5285 22.6545 16.8691C23.7499 15.5194 21.9513 14.4408 21.2654 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3.22596 18C2.47666 18 1.88067 17.5285 1.34555 16.8691C0.250089 15.5194 2.04867 14.4408 2.73465 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8.0838 15.1112C7.06203 15.743 4.38299 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81563 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4799 13.6296 8.0838 15.1112Z" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" stroke="#F26457" strokeWidth="1.5" />
      </svg>



      ,
      title: "50K+",
      description: "Active Host World Wide.",
    },

    {
      icon: <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 9C14.5 10.3807 13.3807 11.5 12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9Z" stroke="#F26457" strokeWidth="1.5" />
        <path d="M13.2574 17.4936C12.9201 17.8184 12.4693 18 12.0002 18C11.531 18 11.0802 17.8184 10.7429 17.4936C7.6543 14.5008 3.51519 11.1575 5.53371 6.30373C6.6251 3.67932 9.24494 2 12.0002 2C14.7554 2 17.3752 3.67933 18.4666 6.30373C20.4826 11.1514 16.3536 14.5111 13.2574 17.4936Z" stroke="#F26457" strokeWidth="1.5" />
        <path d="M18 20C18 21.1046 15.3137 22 12 22C8.68629 22 6 21.1046 6 20" stroke="#F26457" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      ,
      title: "120+",
      description: "Countries Reach",
    },

    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5934 13.2244C21.3482 13.0354 21.067 12.8983 20.7671 12.8214C20.4671 12.7445 20.1547 12.7295 19.8488 12.7772C21.6094 10.9997 22.5 9.23253 22.5 7.50003C22.5 5.01846 20.5041 3.00003 18.0506 3.00003C17.3996 2.99594 16.7556 3.13439 16.1638 3.40567C15.5721 3.67695 15.0468 4.07448 14.625 4.57034C14.2032 4.07448 13.6779 3.67695 13.0862 3.40567C12.4944 3.13439 11.8504 2.99594 11.1994 3.00003C8.74594 3.00003 6.75 5.01846 6.75 7.50003C6.75 8.53128 7.05375 9.53346 7.69312 10.5938C7.16947 10.7264 6.69158 10.9986 6.31031 11.3813L4.18969 13.5H1.5C1.10218 13.5 0.720644 13.6581 0.43934 13.9394C0.158035 14.2207 0 14.6022 0 15L0 18.75C0 19.1479 0.158035 19.5294 0.43934 19.8107C0.720644 20.092 1.10218 20.25 1.5 20.25H11.25C11.3113 20.2501 11.3724 20.2425 11.4319 20.2275L17.4319 18.7275C17.4701 18.7184 17.5075 18.7059 17.5434 18.69L21.1875 17.1394L21.2288 17.1206C21.579 16.9456 21.8789 16.6844 22.1002 16.3614C22.3215 16.0385 22.457 15.6645 22.4939 15.2747C22.5307 14.885 22.4678 14.4922 22.3109 14.1335C22.154 13.7748 21.9084 13.4619 21.5972 13.2244H21.5934ZM11.1994 4.50003C11.7803 4.49153 12.3505 4.65647 12.8371 4.97378C13.3238 5.29108 13.7047 5.74632 13.9313 6.28128C13.9878 6.41883 14.0839 6.53649 14.2074 6.61929C14.3309 6.70209 14.4763 6.7463 14.625 6.7463C14.7737 6.7463 14.9191 6.70209 15.0426 6.61929C15.1661 6.53649 15.2622 6.41883 15.3187 6.28128C15.5453 5.74632 15.9262 5.29108 16.4129 4.97378C16.8995 4.65647 17.4697 4.49153 18.0506 4.50003C19.6491 4.50003 21 5.87346 21 7.50003C21 9.32909 19.5197 11.3982 16.7194 13.4907L15.6797 13.7297C15.7709 13.3442 15.7738 12.943 15.6879 12.5563C15.6021 12.1695 15.4298 11.8072 15.1841 11.4965C14.9383 11.1858 14.6254 10.9348 14.2688 10.7622C13.9122 10.5896 13.5212 10.5 13.125 10.5H9.43875C8.62969 9.40878 8.25 8.44878 8.25 7.50003C8.25 5.87346 9.60094 4.50003 11.1994 4.50003ZM1.5 15H3.75V18.75H1.5V15ZM20.5716 15.7697L17.0091 17.2866L11.1562 18.75H5.25V14.5603L7.37156 12.4397C7.51035 12.2998 7.67555 12.1889 7.85758 12.1134C8.03961 12.0379 8.23482 11.9994 8.43188 12H13.125C13.4234 12 13.7095 12.1186 13.9205 12.3295C14.1315 12.5405 14.25 12.8267 14.25 13.125C14.25 13.4234 14.1315 13.7095 13.9205 13.9205C13.7095 14.1315 13.4234 14.25 13.125 14.25H10.5C10.3011 14.25 10.1103 14.329 9.96967 14.4697C9.82902 14.6103 9.75 14.8011 9.75 15C9.75 15.1989 9.82902 15.3897 9.96967 15.5304C10.1103 15.671 10.3011 15.75 10.5 15.75H13.5C13.5565 15.7499 13.6127 15.7436 13.6678 15.7313L19.9491 14.2866L19.9781 14.2791C20.1699 14.2259 20.3745 14.2454 20.5527 14.334C20.7309 14.4226 20.87 14.574 20.9433 14.759C21.0167 14.944 21.0189 15.1495 20.9498 15.3361C20.8806 15.5227 20.7449 15.6772 20.5687 15.7697H20.5716Z" fill="#F26457" />
      </svg>
      ,
      title: "1M+",
      description: "Cultural Experiences Shared",
    },

    {
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.7627 3.15918C11.8375 2.92885 12.1625 2.92885 12.2373 3.15918L13.7568 7.83301C13.9913 8.55376 14.6629 9.04199 15.4209 9.04199H20.335C20.577 9.04199 20.678 9.3517 20.4824 9.49414L16.5059 12.3828C15.8928 12.8284 15.6361 13.6181 15.8701 14.3389L17.3887 19.0127C17.4635 19.243 17.1998 19.4343 17.0039 19.292L13.0283 16.4043C12.415 15.9587 11.585 15.9587 10.9717 16.4043L6.99609 19.292C6.80016 19.4343 6.53649 19.243 6.61133 19.0127L8.12988 14.3389C8.36392 13.6181 8.10715 12.8284 7.49414 12.3828L3.51758 9.49414C3.32201 9.3517 3.42297 9.04199 3.66504 9.04199H8.5791C9.33706 9.04199 10.0087 8.55376 10.2432 7.83301L11.7627 3.15918Z" stroke="#F26457" stroke-width="1.5" />
      </svg>

      ,
      title: "4.8/5",
      description: "Average Experience Rating",
    },

  ]
  const teamMembers: TeamMember[] = [
    {
      name: "Jephthah Ohimain",
      title: "CEO and Co-founder",
      description: "Former travel journalist passionate about cultural preservation.",
      image: "/images/jephthah.png", // Place this in /public/images
    },
    {
      name: "Jephthah Ohimain",
      title: "CEO and Co-founder",
      description: "Former travel journalist passionate about cultural preservation.",
      image: "/images/jephthah.png",
    },
    {
      name: "Jephthah Ohimain",
      title: "CEO and Co-founder",
      description: "Former travel journalist passionate about cultural preservation.",
      image: "/images/jephthah.png",
    },
  ];

  return (
    <section className="">
      <div className="mx-auto ">
        {/* Mission Statement */}
        <div className="flex flex-col lg:flex-row items-center justify-between  py-[90px] w-full  lg:px-4 gap-[45px] mb-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-[42px] font-bold  mb-6">
              Host Requirements
            </h2>
            <p className="description  mb-3 font-light text-[14px]">
              To create meaningful connections between travelers and local communities through authentic experiences that celebrate cultural diversity and promote sustainable tourism.            </p>

            <Button
              variant="primary"
              className=" "
            >
              <span className="text-white text-sm font-bold w-24">
                Start Exploring Now
              </span>
            </Button>
          </div>
          <div className="lg:w-1/2 h-[368px] flex justify-end rounded-[18px]">
            <img src="/images/mission.png" className="h-[400px] rounded-4xl object-cover w-full" alt="" />
          </div>
        </div>

        <div className="text- mb-16 space-y-4">
          <div>
            <h2 className="text-3xl md:text-[42px] font-bold  mb-6">Our Values</h2>
            <p className="text-xl description">
              Guiding principles for meaningful travel and cultural connection.
            </p></div>


          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-7 lg:p-15 box-color rounded-[16px]">
                <div className=" bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-[24px] font-semibold  mb-3">{value.title}</h3>
                <p className=" leading-relaxed description ">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-16 px-4 grid gap-8  ">
          <div>
            <h2 className="text-[32px] lg:text-4xl font-plus-jakarta font-bold ">Meet Our Team
            </h2>
            <p className="description">
              A team passionate about making authentic travel experiences accessible to all.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className=" rounded-2xl overflow-hidden transition duration-300"
              >
                <img src={member.image} alt={member.name} className="w-full h-72 object-cover" />

                <div className="p-6 box-color grid gap-3">
                  <h3 className="text-xl font-inter font-semibold">{member.name}</h3>
                  <p className="!text-xs description">{member.title}</p>
                  <p className="text-sm description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text- mb-16 space-y-4">
          <div>
            <h2 className="text-3xl md:text-[42px] font-bold  mb-2">Our Impact</h2>
            <p className="text-xl description">
              Creating positive change through meaningful travel experiences and community connections.
            </p></div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="text-center p-10  box-color rounded-[16px]">
                <div className=" bg-white w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  {impact.icon}
                </div>
                <h3 className="text-[24px] font-semibold  mb-3">{impact.title}</h3>
                <p className=" leading-relaxed description ">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story */}
        <CTA />
      </div>
    </section>
  )
}

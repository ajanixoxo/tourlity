
import React, {useState} from "react";
export default () => {
	const [input1, onChangeInput1] = useState('');
	return (
		<div className="bg-white">
			<div className="self-stretch my-0.5">
				<div className="flex flex-col self-stretch bg-[#FAF9F6] pt-6 pb-14 gap-12">
					<div className="flex items-center self-stretch bg-white p-4 mx-14 gap-3 rounded-3xl border border-solid border-[#3E3E3E26]" 
						style={{
							boxShadow: "0px 7px 25px #3E3E3E1A"
						}}>
						<div className="flex flex-1 items-center">
							<span className="flex-1 text-[#F26457] text-[32px]" >
								{"Tourlity"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/lgqlpler_expires_30_days.png"} 
								className="w-1.5 h-4 mr-3.5 object-fill"
							/>
							<span className="text-[#5A5A5A] text-sm mr-3.5" >
								{"Explore Tours"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/ndv5u8yq_expires_30_days.png"} 
								className="w-0.5 h-0.5 mr-2 object-fill"
							/>
							<span className="text-[#5A5A5A] text-sm mr-3.5" >
								{"Become a Host"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/tajms8xh_expires_30_days.png"} 
								className="w-0.5 h-0.5 mr-2 object-fill"
							/>
							<span className="text-[#5A5A5A] text-sm mr-3" >
								{"About"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/tx48kose_expires_30_days.png"} 
								className="w-0.5 h-0.5 mr-2 object-fill"
							/>
							<span className="text-[#5A5A5A] text-sm mr-[5px]" >
								{"Contact"}
							</span>
						</div>
						<div className="flex shrink-0 items-start gap-3">
							<button className="flex flex-col shrink-0 items-start bg-white text-left py-2.5 px-4 rounded-[14px] border border-solid border-[#E0E0E0B0]"
								onClick={()=>alert("Pressed!")}>
								<span className="text-[#A0A0A0] text-sm font-bold w-[103px]" >
									{"Access Account"}
								</span>
							</button>
							<button className="flex flex-col shrink-0 items-start bg-[#F26457] text-left py-2.5 px-4 rounded-[14px] border border-solid border-[#CA3F33]" 
								style={{
									boxShadow: "0px 7px 25px #3E3E3E1A"
								}}
								onClick={()=>alert("Pressed!")}>
								<span className="text-white text-sm font-bold w-[99px]" >
									{"Create Account"}
								</span>
							</button>
						</div>
					</div>
					<button className="flex flex-col items-center self-stretch bg-[#00000000] text-left py-[106px] mx-14 rounded-[32px] border-0"
						onClick={()=>alert("Pressed!")}>
						<div className="flex flex-col w-[926px] gap-3">
							<span className="text-white text-[74px] text-center" >
								{"Share Your Passion as a Host"}
							</span>
							<span className="text-white text-sm text-center mx-[232px]" >
								{"Turn your expertise into extraordinary experiences. Join our community of hosts and inspire travelers from around the world."}
							</span>
							<div className="flex flex-col items-center self-stretch">
								<div className="flex flex-col items-start bg-[#F26457] py-2.5 px-4 rounded-[14px] border border-solid border-[#CA3F33]" 
									style={{
										boxShadow: "0px 7px 25px #3E3E3E1A"
									}}>
									<span className="text-white text-sm font-bold w-[139px]" >
										{"Become a Host Today"}
									</span>
								</div>
							</div>
						</div>
					</button>
				</div>
				<div className="flex flex-col items-start self-stretch bg-[#FAF9F6] p-14 gap-10">
					<div className="flex flex-col items-start gap-3">
						<span className="text-[#1E2023] text-[42px] font-bold" >
							{"Why Host on Tourlity?"}
						</span>
						<span className="text-[#5A5A5A] text-sm" >
							{"Join hosts sharing experiences and connecting with travelers."}
						</span>
					</div>
					<div className="flex items-start self-stretch gap-6">
						<div className="flex flex-1 flex-col items-center bg-stone-100 py-12 px-[26px] gap-2.5 rounded-[18px]">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/6gqb3d1m_expires_30_days.png"} 
								className="w-14 h-14 object-fill"
							/>
							<div className="flex flex-col self-stretch gap-2">
								<span className="text-[#1E2023] text-2xl font-bold mx-16" >
									{"Earn Extra Income"}
								</span>
								<span className="text-[#5A5A5A] text-sm text-center mx-[26px]" >
									{"Set your own prices and schedule. Turn your passion into a profitable venture while maintaining flexibility."}
								</span>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-center bg-stone-100 py-12 px-[26px] gap-2.5 rounded-[18px]">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/p71qpwos_expires_30_days.png"} 
								className="w-14 h-14 object-fill"
							/>
							<div className="flex flex-col self-stretch gap-2">
								<span className="text-[#1E2023] text-2xl font-bold mx-[89px]" >
									{"Global Reach"}
								</span>
								<span className="text-[#5A5A5A] text-sm text-center mx-[26px]" >
									{"Connect with travelers from around the world and share your unique perspective and local expertise."}
								</span>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-center bg-stone-100 py-12 px-[26px] gap-2.5 rounded-[18px]">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/30jxdtu8_expires_30_days.png"} 
								className="w-14 h-14 object-fill"
							/>
							<div className="flex flex-col self-stretch gap-2">
								<span className="text-[#1E2023] text-2xl font-bold mx-[95px]" >
									{"Full Support"}
								</span>
								<span className="text-[#5A5A5A] text-sm text-center mx-[26px]" >
									{"Get comprehensive support, insurance coverage, and tools to help you succeed as a host."}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start self-stretch bg-[#FAF9F6] pt-14 pb-[70px] px-14 gap-10">
					<div className="flex flex-col items-start gap-3">
						<span className="text-[#1E2023] text-[42px] font-bold" >
							{"How to Become a Host"}
						</span>
						<span className="text-[#5A5A5A] text-sm" >
							{"Start sharing your experiences in three simple steps"}
						</span>
					</div>
					<div className="flex items-start self-stretch gap-6">
						<div className="flex flex-1 flex-col items-start bg-stone-100 p-6 gap-2.5 rounded-[18px]">
							<button className="flex flex-col items-start bg-white text-left py-2.5 px-[23px] rounded-[32px] border-0"
								onClick={()=>alert("Pressed!")}>
								<span className="text-[#F26457] text-2xl font-bold" >
									{"1"}
								</span>
							</button>
							<div className="flex flex-col items-start self-stretch gap-2">
								<span className="text-[#1E2023] text-2xl font-bold" >
									{"Create Your Experience"}
								</span>
								<span className="text-[#5A5A5A] text-sm" >
									{"Design your unique experience and set your availability, group size, and pricing."}
								</span>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-start bg-stone-100 p-6 gap-2.5 rounded-[18px]">
							<button className="flex flex-col items-start bg-white text-left py-2.5 px-5 rounded-[32px] border-0"
								onClick={()=>alert("Pressed!")}>
								<span className="text-[#F26457] text-2xl font-bold" >
									{"2"}
								</span>
							</button>
							<div className="flex flex-col items-start self-stretch gap-2">
								<span className="text-[#1E2023] text-2xl font-bold" >
									{"Get Verified"}
								</span>
								<span className="text-[#5A5A5A] text-sm" >
									{"Complete our verification process to ensure safety and quality for all users."}
								</span>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-start bg-stone-100 p-6 gap-2.5 rounded-[18px]">
							<button className="flex flex-col items-start bg-white text-left py-2.5 px-[21px] rounded-[32px] border-0"
								onClick={()=>alert("Pressed!")}>
								<span className="text-[#F26457] text-2xl font-bold" >
									{"3"}
								</span>
							</button>
							<div className="flex flex-col items-start self-stretch gap-2">
								<span className="text-[#1E2023] text-2xl font-bold" >
									{"Start Hosting"}
								</span>
								<span className="text-[#5A5A5A] text-sm" >
									{"Welcome your first guests and start creating memorable experiences."}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start self-stretch bg-[#FAF9F6] p-14 gap-10">
					<div className="flex flex-col items-start gap-3">
						<span className="text-[#1E2023] text-[42px] font-bold" >
							{"Success Stories"}
						</span>
						<span className="text-[#5A5A5A] text-sm" >
							{"Hear from hosts sharing their passions and creating memorable experiences."}
						</span>
					</div>
					<div className="flex items-start self-stretch gap-6">
						<div className="flex flex-1 flex-col items-start bg-stone-100 p-6 gap-3 rounded-[18px]">
							<div className="flex flex-col items-start self-stretch">
								<div className="flex items-center pr-0.5 mb-2.5 gap-2.5">
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/kcrha3nz_expires_30_days.png"} 
										className="w-[46px] h-[46px] object-fill"
									/>
									<div className="flex flex-col shrink-0 items-start gap-1">
										<span className="text-[#1E2023] text-sm font-bold" >
											{"Marco Rossi"}
										</span>
										<span className="text-[#5A5A5A] text-xs w-32" >
											{"Cooking Experience Host"}
										</span>
									</div>
								</div>
								<span className="text-[#5A5A5A] text-sm mb-[1px]" >
									{""Sharing my family's pasta-making traditions has been incredibly rewarding. I've met amazing people from around the world and built a thriving business doing what I love.""}
								</span>
							</div>
							<div className="flex items-center pr-[3px] gap-1.5">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/1x2jsao0_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/lq2lc9c1_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/cpdsdyrd_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/c9mvftw1_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/a5gqzqhd_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<span className="text-[#5A5A5A] text-xs" >
									{"4.3 (98 Reviews)"}
								</span>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-start bg-stone-100 p-6 gap-3 rounded-[18px]">
							<div className="flex flex-col items-start self-stretch">
								<div className="flex items-center pr-0.5 mb-2.5 gap-2.5">
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/yky6qbrq_expires_30_days.png"} 
										className="w-[46px] h-[46px] object-fill"
									/>
									<div className="flex flex-col shrink-0 items-start gap-1">
										<span className="text-[#1E2023] text-sm font-bold" >
											{"Yuki Tanaka"}
										</span>
										<span className="text-[#5A5A5A] text-xs w-[101px]" >
											{"Tea Ceremony Host"}
										</span>
									</div>
								</div>
								<span className="text-[#5A5A5A] text-sm mb-[1px]" >
									{""Hosting tea ceremonies allows me to preserve and share our cultural heritage. It's wonderful to see guests discover the beauty and tranquility of this ancient practice.""}
								</span>
							</div>
							<div className="flex items-center pr-[3px] gap-1.5">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/ghi7i6l6_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/3weiyni7_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/p411ubnb_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/9x3kgm0e_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/66q6qfqv_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<span className="text-[#5A5A5A] text-xs" >
									{"4.8 (75 Reviews)"}
								</span>
							</div>
						</div>
						<div className="flex flex-1 flex-col items-start bg-stone-100 p-6 gap-3 rounded-[18px]">
							<div className="flex flex-col items-start self-stretch">
								<div className="flex items-center pr-0.5 mb-2.5 gap-2.5">
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/hpb3zcpo_expires_30_days.png"} 
										className="w-[46px] h-[46px] object-fill"
									/>
									<div className="flex flex-col shrink-0 items-start gap-1">
										<span className="text-[#1E2023] text-sm font-bold" >
											{"Sofia Martinez"}
										</span>
										<span className="text-[#5A5A5A] text-xs w-[101px]" >
											{"Street Art Tour Host"}
										</span>
									</div>
								</div>
								<span className="text-[#5A5A5A] text-sm mb-[1px]" >
									{""Through my street art tours, I've been able to showcase our city's creative spirit and support local artists. Every tour brings new perspectives and connections.""}
								</span>
							</div>
							<div className="flex items-center pr-[3px] gap-1.5">
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/31zoutkr_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/cg4y6lnc_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/mqenpzzp_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/umxh138w_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<img
									src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/a1pmyw1r_expires_30_days.png"} 
									className="w-6 h-6 object-fill"
								/>
								<span className="text-[#5A5A5A] text-xs" >
									{"4.9 (300 Reviews)"}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="flex items-center self-stretch bg-[#1E4D4D] py-[90px] px-14 gap-[45px]">
					<div className="flex flex-col shrink-0 items-start">
						<span className="text-white text-[42px] font-bold mb-3" >
							{"Host Requirements"}
						</span>
						<span className="text-white text-sm w-[498px] mb-6" >
							{"To ensure the best experience for everyone, we have some basic requirements for our hosts:"}
						</span>
						<div className="flex items-center mb-2.5 gap-2">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/ot4zlc5k_expires_30_days.png"} 
								className="w-6 h-6 object-fill"
							/>
							<span className="text-white text-sm" >
								{"Demonstrate knowledge and enthusiasm in your experience area"}
							</span>
						</div>
						<div className="flex items-center mb-2.5 gap-2">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/o7yokx8l_expires_30_days.png"} 
								className="w-6 h-6 object-fill"
							/>
							<span className="text-white text-sm" >
								{"Maintain required certifications and insurance coverage"}
							</span>
						</div>
						<div className="flex items-center mb-2.5 gap-2">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/f2ofbdgm_expires_30_days.png"} 
								className="w-6 h-6 object-fill"
							/>
							<span className="text-white text-sm" >
								{"Responsive and clear communication with guests"}
							</span>
						</div>
						<div className="flex items-center mb-[23px] gap-2">
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/erpusmcf_expires_30_days.png"} 
								className="w-6 h-6 object-fill"
							/>
							<span className="text-white text-sm" >
								{"Consistently deliver high-quality experiences"}
							</span>
						</div>
						<button className="flex flex-col items-start bg-[#F26457] text-left py-2.5 px-4 rounded-[14px] border border-solid border-[#CA3F33]" 
							style={{
								boxShadow: "0px 7px 25px #3E3E3E1A"
							}}
							onClick={()=>alert("Pressed!")}>
							<span className="text-white text-sm font-bold w-24" >
								{"Become a Host"}
							</span>
						</button>
					</div>
					<div className="flex-1 bg-[#00000000] h-[368px] rounded-[18px]">
					</div>
				</div>
				<div className="flex flex-col items-center self-stretch bg-[#FAF9F6] pt-[90px] pb-14">
					<div className="flex flex-col w-[525px] gap-6">
						<div className="flex flex-col items-start self-stretch mx-[52px] gap-3">
							<span className="text-[#1E2023] text-[42px] font-bold mx-[86px]" >
								{"Stay Inspired"}
							</span>
							<span className="text-[#5A5A5A] text-sm text-center w-[421px]" >
								{"Subscribe to our newsletter for travel inspiration, featured experiences, and exclusive offers."}
							</span>
						</div>
						<div className="flex flex-col self-stretch gap-2">
							<div className="flex items-center self-stretch bg-[#FFFFFF99] py-2.5 px-[15px] rounded-[20px] border border-solid border-[#E0E0E0B0]">
								<input
									placeholder={"Enter your email address..."}
									value={input1}
									onChange={(event)=>onChangeInput1(event.target.value)}
									className="flex-1 self-stretch text-[#263939] bg-transparent text-sm py-3.5 border-0"
								/>
								<div className="flex flex-1 flex-col bg-[#F26457] py-2.5 rounded-[14px] border border-solid border-[#CA3F33]" 
									style={{
										boxShadow: "0px 7px 25px #3E3E3E1A"
									}}>
									<span className="text-white text-sm font-bold mx-4" >
										{"Subscribe to Newsletter"}
									</span>
								</div>
							</div>
							<span className="text-[#A0A0A0] text-xs mx-[60px]" >
								{"By subscribing, you agree to our Privacy Policy and consent to receive updates."}
							</span>
						</div>
					</div>
				</div>

				<div className="self-stretch bg-[#FAF9F6] py-14">
					<div className="flex flex-col items-start self-stretch bg-stone-100 pt-10 mx-14 gap-6 rounded-[32px]">
						<div className="flex justify-between items-start self-stretch mx-10">
							<div className="flex flex-col shrink-0 items-start gap-2.5">
								<span className="text-[#F26457] text-[32px]" >
									{"Tourlity"}
								</span>
								<span className="text-[#5A5A5A] text-sm w-[370px]" >
									{"Connecting travelers with authentic local experiences around the world. Our platform brings together passionate hosts and curious explorers."}
								</span>
								<div className="flex items-start gap-2">
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/qjzpjwqa_expires_30_days.png"} 
										className="w-10 h-10 object-fill"
									/>
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/kjtzsklh_expires_30_days.png"} 
										className="w-10 h-10 object-fill"
									/>
									<img
										src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/xn55pudv_expires_30_days.png"} 
										className="w-10 h-10 object-fill"
									/>
								</div>
							</div>
							<div className="flex shrink-0 items-start">
								<div className="flex flex-col shrink-0 items-start mr-[73px] gap-2.5">
									<span className="text-[#1E2023] text-xl font-bold" >
										{"Explore"}
									</span>
									<div className="flex flex-col items-start gap-2">
										<span className="text-[#5A5A5A] text-sm" >
											{"Virtual Tours"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Categories"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Destinations"}
										</span>
									</div>
								</div>
								<div className="flex flex-col shrink-0 items-start mr-[74px] gap-2.5">
									<span className="text-[#1E2023] text-xl font-bold" >
										{"Quick Links"}
									</span>
									<div className="flex flex-col items-start gap-2">
										<span className="text-[#5A5A5A] text-sm" >
											{"Become a Host"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"About"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Blogs"}
										</span>
									</div>
								</div>
								<div className="flex flex-col shrink-0 items-start mr-[74px] gap-2.5">
									<span className="text-[#1E2023] text-xl font-bold" >
										{"Support"}
									</span>
									<div className="flex flex-col items-start gap-2">
										<span className="text-[#5A5A5A] text-sm" >
											{"FAQs"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Contact Us"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Guidelines"}
										</span>
									</div>
								</div>
								<div className="flex flex-col shrink-0 items-start gap-2.5">
									<span className="text-[#1E2023] text-xl font-bold" >
										{"Legal"}
									</span>
									<div className="flex flex-col items-start gap-2">
										<span className="text-[#5A5A5A] text-sm" >
											{"Terms of Service"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Privacy Policy"}
										</span>
										<span className="text-[#5A5A5A] text-sm" >
											{"Cookie Policy"}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-start ml-10">
							<span className="text-[#5A5A5A] text-sm mt-[100px] mr-[595px]" >
								{"© 2025 Tourlity. All Rights Reserved"}
							</span>
							<img
								src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/R1dJEF17rA/rcxiqe5d_expires_30_days.png"} 
								className="w-[317px] h-[189px] rounded-[32px] object-fill"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
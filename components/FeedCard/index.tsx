import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineRetweet } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineFileUpload } from "react-icons/md";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
    data : Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
    const {data} = props;
    return (
        <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-4 hover:bg-slate-950 cursor-pointer transition-all">
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-1">
                    {
                        data.author?.profileImage &&
                        <Image src={data.author.profileImage} alt="avatar" className="rounded-full"
                        height={50} width={50} />
                    }
                </div>
                <div className="col-span-11">
                    <Link href={`${data.author?.id}`}><h5> {data.author?.firstName} {data.author?.lastName} </h5></Link>
                    <p className="text-sm">
                        {data.content}
                    </p>
                    {
                        data.imageURL &&
                        <Image src={data.imageURL} alt="image" width={500} height={200} />
                    }
                    <div className="flex justify-between items-center mt-5 text-xl pr-10">
                        <div>
                        <BiMessageRounded />
                        </div>
                        <div>
                        <AiOutlineRetweet />
                        </div>
                        <div>
                        <AiOutlineHeart />
                        </div>
                        <div>
                        <MdOutlineFileUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard;
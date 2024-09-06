import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ConversationHeroProps {
  name?: string;
  image?: string;
}

const ConversationHero = ({
  name = "member",
  image,
}: ConversationHeroProps) => {
  const avatarFallback = name.charAt(0).toUpperCase();

  return (
    <div className="mt-[88px] mx-5 mb-4">
      <div
        className="flex items-center gap-x-2 mb-2 text-2xl font-semibold
      text-gray-900 dark:text-gray-100"
      >
        <Avatar className="size-12 mr-2">
          <AvatarImage src={image} className="rounded-md" />
          <AvatarFallback className="rounded-md bg-sky-600 dark:bg-sky-700 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <p className="text-2xl font-bold">{name}</p>
      </div>

      <p className="font-normal text-gray-800 dark:text-gray-300 mb-4">
        This conversation is just between you and{" "}
        <strong className="text-blue-500 dark:text-blue-400">{name}</strong>.
      </p>
    </div>
  );
};

export default ConversationHero;

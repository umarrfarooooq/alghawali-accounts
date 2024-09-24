import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ViewDetails = ({ item, tooltip }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{item}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ViewDetails;

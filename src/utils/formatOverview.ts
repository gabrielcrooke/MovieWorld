export interface OverviewResult {
  text: string;
  isError: boolean;
}

export const formatOverview = (overview: string | undefined) => {
  if (!overview || overview === '') {
    return {text: 'No description available', isError: true};
  }
  return {
    text: overview.length > 130 ? overview.substring(0, 130) + '...' : overview,
    isError: false,
  };
};

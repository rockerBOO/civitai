import { getImageV2Select, imageResourceSelect } from './imagev2.selector';
import { simpleTagSelect, imageTagSelect } from './tag.selector';
import { Prisma } from '@prisma/client';
import { userWithCosmeticsSelect } from '~/server/selectors/user.selector';

export const editPostImageSelect = Prisma.validator<Prisma.ImageSelect>()({
  id: true,
  name: true,
  url: true,
  nsfw: true,
  width: true,
  height: true,
  hash: true,
  meta: true,
  hideMeta: true,
  generationProcess: true,
  needsReview: true,
  tags: { select: { tag: { select: imageTagSelect } } },
  resources: { select: imageResourceSelect },
});
type PostImageNavigationProps = { previewUrl?: string };
export type PostImage = Prisma.ImageGetPayload<typeof postImage> & PostImageNavigationProps;
const postImage = Prisma.validator<Prisma.ImageArgs>()({ select: editPostImageSelect });

export const editPostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  nsfw: true,
  title: true,
  modelVersionId: true,
  userId: true,
  status: true,
  scanned: true,
  images: {
    orderBy: { index: 'asc' },
    select: editPostImageSelect,
  },
  tags: { select: { tag: { select: simpleTagSelect } } },
});

export const simplePostSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  nsfw: true,
  title: true,
  user: { select: userWithCosmeticsSelect },
  images: {
    orderBy: { index: 'asc' },
    take: 1,
    select: {
      id: true,
      name: true,
      url: true,
      nsfw: true,
      width: true,
      height: true,
    },
  },
  // TODO.posts - stats (commentCount, what else?)
});

export const getPostDetailSelect = ({ userId }: { userId?: number }) =>
  Prisma.validator<Prisma.PostSelect>()({
    id: true,
    nsfw: true,
    title: true,
    modelVersionId: true,
    user: { select: userWithCosmeticsSelect },
    status: true,
    scanned: true,
    images: {
      orderBy: { index: 'asc' },
      select: getImageV2Select({ userId }),
    },
    tags: { select: { tag: { select: simpleTagSelect } } },
  });
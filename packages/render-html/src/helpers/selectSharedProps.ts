import pickBy from 'ramda/src/pickBy';
import pick from 'ramda/src/pick';
import pipe from 'ramda/src/pipe';
import mergeRight from 'ramda/src/mergeRight';
import { RenderHTMLProps, RenderHTMLAmbiantSharedProps } from '../shared-types';
import defaultSharedProps from '../context/defaultSharedProps';

const selectSharedProps = (
  props: Partial<RenderHTMLProps>
): RenderHTMLAmbiantSharedProps => {
  const picked = pick(Object.keys(defaultSharedProps) as Array<keyof RenderHTMLAmbiantSharedProps>, props);
  const filtered = pickBy((val) => val != null, picked) as Partial<RenderHTMLAmbiantSharedProps>;
  return mergeRight(defaultSharedProps, filtered as any) as RenderHTMLAmbiantSharedProps;
};

export default selectSharedProps;

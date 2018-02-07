import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { H4, BodyText } from '@ui/typography';
import { Link } from '@ui/NativeWebRouter';
import Card, { CardContent, CardImage } from '@ui/Card';
import { ResponsiveSideBySideView } from '@ui/SideBySideView';
import Paragraph from '@ui/Paragraph';
import FlexedView from '@ui/FlexedView';
import styled from '@ui/styled';
import Button from '@ui/Button';

const ButtonWrapper = styled({ alignItems: 'flex-start' })(FlexedView);

const ImageColumn = styled(Platform.select({
  web: {
    position: 'absolute',
    top: 0,
    left: '50%',
    right: 0,
    bottom: 0,
  },
}))(FlexedView);

const ContentColumn = styled(({ theme }) => Platform.select({
  web: {
    justifyContent: 'center',
    paddingVertical: theme.sizing.baseUnit * 2,
    paddingHorizontal: theme.sizing.baseUnit * 1.5,
    width: '50%',
    flex: 0,
  },
}))(FlexedView);

const FundCard = ({
  id,
  name,
  summary,
  images,
  isLoading,
}) => (
  <Link to={`/give/campaign/${id}`} key={id}>
    <Card isLoading={isLoading}>
      <ResponsiveSideBySideView>
        <ImageColumn><CardImage style={{ height: '100%', resizeMode: 'cover' }} source={images} /></ImageColumn>
        <ContentColumn>
          <CardContent>
            <H4>{name}</H4>
            <Paragraph>
              <BodyText>
                {summary}
              </BodyText>
            </Paragraph>
            {Platform.OS === 'web' ? (
              <ButtonWrapper><Button title="Learn More" bordered /></ButtonWrapper>
            ) : null}
          </CardContent>
        </ContentColumn>
      </ResponsiveSideBySideView>
    </Card>
  </Link>
);

FundCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  summary: PropTypes.string,
  images: PropTypes.any, // eslint-disable-line
  isLoading: PropTypes.bool,
};

export default FundCard;

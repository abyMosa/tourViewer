import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Col, Container, Row, Loader, Pagination } from '@abymosa/ipsg';
// import { useSelector } from 'react-redux';

interface Props {
    heads?: string[];
    renderRow: (p: any) => JSX.Element,
    data: any[],
    className: string,
    loading: boolean;
    linkPrefix?: string,
    pageLimit: number;
}

const PaginatedContent = (props: Props) => {

    const { heads, renderRow, data, className, loading, pageLimit } = props;
    const [offset, setOffset] = useState(0);
    const [currentPosts, setCurrentPosts] = useState(data.slice(offset, offset + pageLimit));

    useEffect(() => {
        setCurrentPosts(data.slice(offset, offset + pageLimit));
    }, [data, offset, pageLimit]);

    const onPageChanged = (d: any) => {
        let offset = (d.currentPage - 1) * d.pageLimit;
        setOffset(offset);
    }

    return (
        <div className="paginated-content__wrap">

            <Container>
                <Row className="">
                    <Col md12 >
                        <div className={cn("paginated-content", className)}>
                            <div className="paginated-content__head">
                                {!heads ? null :
                                    heads.map(h => <div className="paginated-content__head-cell" key={h}>{h}</div>)
                                }
                            </div>
                            <Loader show={loading} invert success />
                            {currentPosts.map(p => <div className="paginated-content__row" key={p._id}> {renderRow(p)} </div>)}
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="paginated-content__footer ">
                <Container>
                    <Row >
                        <Col md12>
                            <Pagination
                                totalRecords={data.length}
                                pageLimit={pageLimit}
                                pageNeighbours={1}
                                onPageChanged={onPageChanged}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default PaginatedContent;